#include "public_io.h"
void str_cli(FILE *file,int sockfd);
int main(int argc,char **argv)
{
	int sockfd;
	struct sockaddr_in servaddr; /*服务器套接字地址信息*/
	if(argc != 2){
		fprintf(stdin, "需要有服务器地址信息\n");
		exit(-1);
	}
	sockfd = socket(AF_INET,SOCK_STREAM,0);
	bzero(&servaddr,sizeof(servaddr));

	servaddr.sin_family = AF_INET;
	servaddr.sin_port = htons(PUBLIC_PORT);//第二个参数为端口信息
	inet_pton(AF_INET,argv[1],&servaddr.sin_addr);

	connect(sockfd,(struct sockaddr*)&servaddr,sizeof(servaddr));
	/*处理消息*/
	str_cli(stdin,sockfd);
	return 0;
}
void str_cli(FILE *file,int sockfd)
{
	char sendline[MAXLINE],recvline[MAXLINE];//定义发送和接收信息的缓冲区.
	while(fgets(sendline,MAXLINE,file) != NULL){
		writen(sockfd,sendline,strlen(sendline));

		if(readline(sockfd,recvline,MAXLINE) == 0){
			fprintf(stderr, "server terminated...\n");
			exit(-1);
		}
		fputs(recvline,stdout);//将接收到消息打印到屏幕.
	}
}
