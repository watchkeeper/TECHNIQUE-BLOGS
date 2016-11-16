#include "../public_io.h"
#include "nat_protocol.h"

/*
 * type socket传输的类型
 */
int init_sock(int type)
{
    int sockfd;
    if((sockfd = socket(AF_INET,type,0)) < 0){
        printf("open socket error\n" );
        exit(EXIT_FAILURE);
    }
    return sockfd;
}

int main(int argc, char const *argv[]) {
    int sockfd;
    sockaddr_in local_addr,sender/*当前登录端*/;
    c_2_s_msg recvbuf; //客户端发送的数据.
    struct node *user_list;/*用户列表*/

    sockfd = init_sock(SOCK_DGRAM);
    local_addr.sin_family = AF_INET;
    local_addr.sin_port = htons(SERVER_PORT);
    local_addr.sin_addr.s_addr = ptonl(INADDR_ANY);
    if(bind(sockfd,(struct sockaddr *)&local_addr,sizeof(struct sockaddr)) == SOCKET_ERROR){
        printf("绑定端口失败\n");
        exit(EXIT_FAILURE);
    }

    bzero(&recvbuf,sizeof(c_2_s_msg));

    /*开始主要工作,
        1.读取客户端登陆和退出消息,保存客户列表.
        2.转发客户的p2p请求.
    */
    for(;;){
        int sender_len = sizeof(sender);
        if(recvfrom(sockfd,(char *)&recvbuf,sizeof(c_2_s_msg),0,(struct sockaddr *)&sender,&sender_len) < 0){
            printf("recv error\n" );
            continue;
        }
        cli_msg_type;/*客户端发送数据的类型.*/
        cli_msg_type = recvbuf.message_type;
        switch (cli_msg_type) {
            case LOGIN:/*用户登陆操作*/
            {
                printf("have a user login :%s\n",recvbuf.message.login_member.user_name );
                //获取用户信息
                struct user_node *cur_user;/*登陆用户信息*/
                if((cur_user = malloc(sizeof(struct user_node))) == NULL){
                    printf("给用户分配内存失败\n" );
                    exit(EXIT_FAILURE);
                }
                strcpy(cur_user->user_name,recvbuf.message.login_message.user_name);
                cur_user->port = ntops(sender.sin_port);
                cur_user->ip = ntopl(sender.sin_addr.s_addr);

                /*保存用户信息*/
                if((user_list = malloc(sizeof(struct node))) == NULL){
                    printf("给用户分配空间失败\n" );
                    exit(EXIT_FAILURE);
                }

                user_list = add_to_list(user_list,cur_user);

                int user_count = size(user_list);
                send(sockfd, (const char *)&user_count, sizeof(user_count),0,(struct sockaddr*)&sender,sizeof(sender));
                //将已经登陆的用户列表发送到客户端.
                struct user_node loop_user;
                while ((loop_user = user_list->next) != NULL) {
                    sendto(sockfd,(const char*)loop_user,sizeof(user_node),0,(struct sockaddr *)&sender,sizeof(sender));
                }
                break;
            }
            case LOGOUT:
            {
                //将该用户的信息从列表中删除.
                printf("have a user logout %s \n",recvbuf.message.logout_message.user_name );

                delete_from_list(user_list,(char *)recvbuf.message.logout_message.user_name);
                break;
            }
            case P2PTRANS:/*客户端希望服务端向另一个客户发送打洞信息.*/
            {
                printf("%s want to p2p %s\n",inet_ntoa(sender.sin_addr),recvbuf.message.translate_message.user_name );
                //根据用户名查询用户登陆信息.

                struct user_node remote_user = search(user_list,recvbuf.message.translate_message.user_name);

                struct sockaddr_in remote/*需要打洞的对端.*/
                remote.sin_family = AF_INET;
                remote.sin_port = htons(remote_user.port);
                remote.sin_addr.s_addr = htonl(remote_user.ip);

                struct sockaddr_in tmp;
                tmp.sin_addr.s_addr = htonl(remote_user.ip);/*打印远程地址端口信息*/
                printf("the remote address is :%s ,the remote port is %s\n",inet_ntoa(tmp),remote_user.port );

                //需要转发的消息. trans_msg
                c_2_c_msg trans_msg;/*打洞信息.*/
                trans_msg.message_type = SEVER_TO_CLINET_MSG;
                trans_msg.ip_len = ntohl(sender.sin_addr.s_addr);
                trans_msg.port = ntohs(sender.sin_port);

                sendto(sockfd,(const char*)&trans_msg,sizeof(c_2_c_msg),(struct sockaddr  *)&remote,0,sizeof(remote));
                break;
            }
            case GETALLUSER:/*获取所有用户列表*/
            {
                int command = GETALLUSER;
                sendto(sockfd,(const char*)&command,sizeof(int),0,(struct sockaddr *)&sender,sizeof(struct sockaddr));

                struct user_node send_user;
                while ((send_user = user_list->next) != NULL) {
                    if(sendto(sockfd,(const char*)&send_user,sizeof(struct user_node),0,(struct sockaddr *)&sender,sizeof(struct sockaddr)) < 0)
                        exit(EXIT_FAILURE);
                }
                break;
            }
        }
    }
    return 0;
}
