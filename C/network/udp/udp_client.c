#include "public_io.h"
void dowork(FILE *fp,int sockfd,const struct sockaddr *servaddr,socklen_t ser_len);
/**
 * 使用UDP协议的客户端
 */
int main(int argc, char const *argv[]) {
    /* code */
    int sockfd;
    struct sockaddr_in servaddr;
    bzero(&servaddr,sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(PUBLIC_PORT);
    inet_pton(AF_INET,argv[1],&servaddr.sin_addr);

    sockfd = socket(AF_INET,SOCK_DGRAM,0);
    dowork(stdin,sockfd,(struct sockaddr *)&servaddr,sizeof(servaddr));
    exit(0);
}

void dowork(FILE *fp,int sockfd,const struct sockaddr *servaddr,socklen_t ser_len)
{
    int n;
    char sendline[MAXLINE],recvline[MAXLINE + 1];
    sendto(sockfd,sendline,strlen(sendline),0,servaddr,ser_len);
}
