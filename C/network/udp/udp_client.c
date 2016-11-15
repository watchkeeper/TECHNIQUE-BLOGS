#include "../public_io.h"
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
    socklen_t len;
    struct sockaddr *prely_addr;

    prely_addr = malloc(ser_len);

    while (fgets(sendline,MAXLINE,fp) != NULL {
        sendto(sockfd,sendline,strlen(sendline),0,servaddr,ser_len);

        len = ser_len;
        n = recvfrom(sockfd,recvline,MAXLINE,0,prely_addr,&len);

        /*验证接收到的响应是否正确*/
        if(len != ser_len || memcmp(servaddr,prely_addr,len) != 0){
            printf("reply from %s (ignored)\n", sock_ntop(prely_addr,len));
            continue;
        }
        recvline[n] = 0;
        fputs(recvline,stdout);
    }


}
