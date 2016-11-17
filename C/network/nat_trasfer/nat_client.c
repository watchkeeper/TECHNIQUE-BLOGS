/*客户端程序*/
#include "../public_io.h"
#include "nat_protocol.h"

#define COMMANG_MAX 256
#define MAXRETRY 5
#define RECVED_ACK 0

int sockfd;/*连接套接字*/
char *server_ip;
char *current_user_name;

int init_sock(int type)
{
    int sockfd;
    if((sockfd = socket(AF_INET, type, 0)) < 0){
        printf("init socket error\n" );
        exit(EXIT_FAILURE);
    }
    return sockfd;
}

/**
 * 将套接字和本机任意网卡进行绑定.
 * @param sockfd [description]
 */
void Bind(int sockfd)
{
    sockaddr_in addr;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = 0;
    addr.sin_family = AF_INET;

    if(bind(sockfd, (struct sockaddr *)&addr, sizeof(struct sockaddr)) < 0){
        printf("bind addr and port error\n" );
        exit(EXIT_FAILURE);
    }
}

/**
 * 连接到服务端.
 * @param sockfd    [套接字]
 * @param user_name [登录的用户名]
 * @param server_ip [服务器端的地址信息]
 */
void connect_to_server(int sockfd,char *user_name,char * server_ip)
{
    struct user_node *logined_user_list;
    sockaddr_in remote;//服务器地址信息


    inet_pton(AF_INET, server_ip, &remote.sin_addr);
    remote.sin_family = AF_INET;
    remote.sin_port = htons(SERVER_PORT);

    struct c_2_s_msg server_msg;/*发送到服务器的数据*/
    server_msg.message_type = LOGIN;
    strncpy(server_msg.login_member.user_name , user_name, sizeof(user_name)));

    sendto(sockfd, (char  *)&server_msg, sizeof(server_msg), 0, (struct sockaddr *)&remote, sizeof(struct sockaddr));

    //1.接受已经登录服务器的人数。
    int user_count;
    if(recvfrom(sockfd, (char *)&user_count, sizeof(user_count), 0, (struct sockaddr*)&remote, sizeof(remote)) < 0){
        printf("login is error\n" );
        exit(EXIT_FAILURE);
    }

    int i = 0;
    for(;i<user_count;i++){
        struct user_node user;

        recvfrom(sockfd, (char *)user, sizeof(struct user_node),0,(struct sockaddr*)&remote, sizeof(remote));

        //将已经登录服务器的用户显示出来。
        if((logined_user_list = malloc(sizeof(struct user_node))) == NULL){
            printf("分配内存失败\n" );
            exit(EXIT_FAILURE);
        }

        add_to_list(logined_user_list,user);
        sockaddr_in tmp;
        tmp.sin_addr.s_addr = htonl(user->ip);
        printf("user's ip :%s,port :%d\n",inet_ntoa(tmp.sin_addr),user->port );
    }
}
/**
 * 给用户显示可操作信息
 */
void print_usage() {
    printf("can input command :\n"
            "command type :send,exit,getu\n");
}

/**
 * 给服务器发送数据:
 *  1.直接向某个用户(H)外网发送消息,如果此前两者并没有联系过,那么此消息将发送失败,发送端等待超时.
 *  2.超时后,发送端发送一个请求到服务端,要求服务端给H发送一个请求,请求H给本机发送打洞消息.
 *      将重复该步骤MAXRETRY次.
 * @param  username [当前用户的登录名]
 * @param  msg      [发送的消息]
 * @return          [验证是否发送成功]
 */
int sendmsg(char *username,char *msg)
{
    char real_msg[256];
    unsigned int user_ip;
    unsigned short user_port;

    //找到需要联系的用户(H)
    struct node target_user = search(logined_user_list,username);
    if(!target_user)
        return -1; //表示没有找到对应的用户.
    user_ip = target_user->user_node->ip;
    user_port = target_user->user_node->port;
    strncpy(real_msg,msg,sizeof(msg));

    int i = 0;
    for(;i < MAXRETRY;i++){
        RECVED_ACK = 0;
        struct sockaddr_in remote;/*对端H的地址信息*/
        remote.sin_addr.s_addr = htonl(user_ip);
        remote.sin_family = AF_INET;
        remote.sin_port = htons(user_port);

        /*构建到对端(H)的数据*/
        struct c_2_c_msg to_peer_head;
        to_peer_head.message_type = P2PMESSAGE;
        to_peer_head.ip_len = (int)strlen(real_msg) + 1;

        /*发送消息类型以及消息的长度*/
        sendto(sockfd,(const char*)&to_peer_head,sizeof(to_peer_head),0,(struct sockaddr*)&remote,sizeof(remote));
        /*发送正式数据*/
        sendto(sockfd,(const char*)&real_msg,to_peer_head.ip_len,0,(struct sockaddr  *)&remote,sizeof(remote));

        int j = 0;
        for(;j < 10;j++){ //检测数据是否发送成功.
            if(RECVED_ACK)
                return 1;
            else
                sleep(1); //linux中单位为秒.
        }

        /**
         * 没有接收到目标主机回应,认为目标主机(H)端口映射没有打开,
         * 此时发送请求给服务器,让服务器告诉目标主机(H)打开映射端口(UDP打洞)
         */
        struct sockaddr_in server;
        server.sin_family = AF_INET;
        server.sin_port = htons(SERVER_PORT);
        inet_pton(AF_INET,server_ip,&server.sin_addr);

        /*发送到服务器的数据*/
        struct c_2_s_msg to_server;
        to_server.message_type = P2PTRANS;
        strncpy(to_server.message.translate_message.user_name,username,sizeof(username));
        sendto(sockfd,(const char*)&to_server,sizeof(server),0,(struct sockaddr *)&server,sizeof(server));

        sleep(1); //等待服务器端处理对应的请求信息.
    }
    return 0;
}

/**
 * 接收消息的线程
 */
void recv_thread() {
    struct sockaddr_in remote;
    int size = sizeof(remote);

    /*来自对端或来自服务器的消息.*/
    struct c_2_c_msg from_peer_msg;
    for(;;){
        if(recvfrom(sockfd,(const char*)&from_peer_msg,sizeof(from_peer_msg),0,(struct sockaddr *)&remote,sizeof(remote)) < 0){
            printf("recv from server or client error !\n" );
            continue;
        }
        switch (from_peer_msg.message_type) {
            case P2PMESSAGE: /*收到正常的消息*/
            {
                char *come_msg;
                if((come_msg = malloc(from_peer_msg.ip_len)) == NULL){
                    printf("给接收消息的字符串分配内存失败\n" );
                    exit(EXIT_FAILURE);
                }
                int  msg_len = recvfrom(sockfd,come_msg,sizeof(come_msg),0,(struct sockaddr *)&remote,size);
                if(msg_len < 0){
                    printf("接收消息失败\n" );
                    exit(EXIT_FAILURE);
                }
                printf("recv from peer msg :%s\n", come_msg);

                //回复确认消息.
                struct c_2_c_msg ack_msg;
                ack_msg.message_type = P2PMESSAGEACK;
                sendto(sockfd,(const char*)&ack_msg,sizeof(ack_msg),0,(struct sockaddr *)&remote,size);

                free(come_msg);
                break;
            }
            case CONNECT_MSG: /*对端打洞信息*/
            {
                printf("接收到打洞的命令,向某个指定IP地址打洞\n" );
                struct sockaddr_in remote_peer;
                remote_peer.sin_family =AF_INET;
                remote_peer.sin_addr.s_addr = htonl(from_peer_msg.ip_len);
                remote_peer.sin_port = htons(from_peer_msg.port);

                //打洞需要的数据信息.
                struct c_2_c_msg hole_msg;
                hole_msg.message_type = P2P_TRASH;
                sendto(sockfd,(const char*)&hole_msg,sizeof(hole_msg),0,(struct sockaddr*)&remote_peer,sizeof(remote_peer));
                break;
            }
            case P2PMESSAGEACK: /*收到确认消息.*/
            {
                RECVED_ACK = 1;//表示已经收到对端发送的数据.
                break;
            }
            case P2P_TRASH:/*收到对端打洞的信息.*/
            {
                printf("recv from trash msg\n" );
                break;
            }
            case GETALLUSER:/*返回的是所有用户信息.*/
            {
                int user_count,from_len = sizeof(remote);
                //获取登陆的用户数.
                if(recvfrom(sockfd,(const char*)&user_count,0,(struct sockaddr*)&remote,size)<0){
                    printf("login error !\n" );
                    exit(EXIT_FAILURE);
                }

                int i = 0;
                for(;i < user_count ; i++){
                    struct node user;
                    recvfrom(sockfd,(const char*)&user,sizeof(node),0,(struct sckaddr*)&remote,size);

                    printf("username: %s\n",user->user_name );
                    struct in_addr tmp;
                    tmp.s_addr = htonl(user->ip);
                    printf("ip :%s\n",inet_ntop(tmp) );
                    printf("port :%d\n",user->port );
                }
                break;
            }
        }
    }
}

/**
 * 解析命令行.
 * @param command_line [description]
 */
void parse_command_line(char *command_line) {
    if(strlen(command_line) < 4)
        exit(EXIT_FAILURE);

    char copy_command[10] = {'0'};
    strncpy(copy_command,command_line,4);
    copy_command[4] = '/0';
    if(strcmp(copy_command,"exit") == 0){
        //发送退出所需的数据信息
        struct c_2_s_msg sendbuf;
        sendbuf.message_type = LOGOUT;
        strncpy(sendbuf.message.logout_member.user_name,current_user_name,sizeof(current_user_name));

        //服务器地址信息
        struct sockaddr_in server;
        server.sin_family = AF_INET;
        server.sin_port = htons(SERVER_PORT);
        inet_pton(AF_INET,&server.sin_addr,server_ip);

        sendto(sockfd,(const char*)&sendbuf,0,(struct sockaddr*)&server,sizeof(server));
        closesocket(sockfd);
        exit(0);
    }else if(strcmp(copy_command,"send") == 0){//发送数据

    }
}

int main(int argc, char const *argv[]) {
    sockfd = init_sock(SOCK_DGRAM);
    Bind(sockfd);


    return 0;
}
