#include "tcp/&udp/public_io.h"
void dowork(int sockfd,struct sockaddr *cli_addr,socklen_t cli_len);
/**
 *  使用UDP作为传输协议
 */
int main(int argc, char const *argv[]) {
    /* code */
    int sockfd ;
    struct sockaddr_in servaddr,cliaddr;
    sockfd = socket(AF_INET,SOCK_DGRAM,0);
    bzero(&servaddr,sizeof(servaddr));

    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(PUBLIC_HOST);
    servaddr.sin_port = htons(PUBLIC_PORT);

    /*绑定对应的端口.*/
    bind(sockfd,(struct sockaddr *)&servaddr,sizeof(servaddr));
    /*执行其他工作.*/
    dowork(sockfd,(struct sockaddr *)&cliaddr,sizeof(cliaddr));
    return 0;
}
void dowork(int sockfd,struct sockaddr *cli_addr,socklen_t cli_len)
{
    int n;
    socklen_t len;
    char msg[MAXLINE];

    for(;;){
        len = cli_len;
        n = recvfrom(sockfd,msg,MAXLINE,0,cli_addr,&len);
        sendto(sockfd,msg,n,0,cli_addr,len);
    }
}
