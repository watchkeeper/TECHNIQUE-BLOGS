/*客户端程序*/
#include "../public_io.h"
#include "nat_protocol.h"
#include <arpa/inet.h>

#define COMMANG_MAX 256
#define MAXRETRY 5
#define RECVED_ACK 1

int init_sock(int type)
{
    int sockfd;
    if((sockfd = socket(AF_INET, type, 0)) < 0){
        printf("init socket error\n" );
        exit(EXIT_FAILURE);
    }
    return sockfd;
}

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

/*连接到服务端*/
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
        struct user_node *user;
        if((user = malloc(sizeof(struct user_node))) == NULL){
            printf("分配内存失败\n");
            exit(EXIT_FAILURE);
        }

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
