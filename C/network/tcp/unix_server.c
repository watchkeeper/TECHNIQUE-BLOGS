#include "public_io.h"


void str_echo(int connfd);
int main(int argc ,char **argv)
{
	int listenfd,connfd;
	pid_t child_pid;/*子进程ID*/
	socklen_t chilen;
	struct sockaddr_in cliaddr,servaddr; /*客户端和服务端协议地址*/

	listenfd = socket(AF_INET,SOCK_STREAM,0);

	bzero(&servaddr,sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_port = htons(PUBLIC_PORT);
	servaddr.sin_addr.s_addr = htonl(INADDR_ANY);

	/*将套接字绑定到端口和IP地址上*/
	bind(listenfd,(struct sockaddr*)&servaddr,sizeof(servaddr));

	/*监听*/
	listen(listenfd,5);
	for(;;){
		chilen = sizeof(cliaddr);
		connfd = accept(listenfd,(struct sockaddr*)&cliaddr,&chilen);

		if((child_pid = fork()) == 0){
			//pid为0 ,表示为子进程.
			close(listenfd);
			str_echo(connfd);/*将客户请求打印*/
			exit(0);
		}
		close(connfd);
	}

	return 0;
}
void str_echo(int connfd)
{
	ssize_t n;
	char buffer[MAXLINE],sendline[MAXLINE];

	again:
		while((n = readline(connfd,buffer,MAXLINE)) > 0){
			fputs(buffer,stdout);
			while(fgets(sendline,MAXLINE,stdin) != NULL)
				writen(connfd,sendline,strlen(sendline));
		}

		if(n < 0 && errno == EINTR)
			goto again;
		else if(n < 0){
			fprintf(stderr,"read error..");
			exit(-1);
		}
			
}