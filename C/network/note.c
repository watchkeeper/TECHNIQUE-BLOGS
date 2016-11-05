一.准备:
	POSIX数据类型:
		数据类型			说明						头文件
		int8_t			带符号8位整数				<sys/types.h>
		uint8_t			无符号8位整数						~
		int16_t			带符号16位整数						~
		uint16_t		无符号16位整数						~
		int32_t			带符号32位整数						~
		uint32_t		无符号32位整数						~
		--------------------------------------------------------------
		sa_family_t		套接字地址结构的地质族		<sys/socket.h> /*可以是任何的无符号整数,但一般为8位无符号整数*/
		socklen_t		套接字地址结构长度,一般 uint32_t	~
		--------------------------------------------------------------
		in_addr_t		IPv4地址,一般为 uint32_t 	<netinet/in.h>
		in_port_t		TCP/UDP端口,一般为uint16_t 			~


	1.IPv4套接字地址结构:<netinet/in.h>
		struct in_addr
		{
			in_addr_t s_addr;
		};
		struct sockaddr_in
		{
			uint8_t 		sin_len;
			sa_family_t		sin_family; /*协议族*/
			in_port_t		sin_port;
			struct in_addr 	sin_addr;

			char			sin_zero[8];
		};
		IPv4通用套接字:
		struct sockaddr
		{
			uint8_t		sa_len;
			sa_family_t	sa_family;
			char		sa_data[4];
		};
	2.IPv6套接字地址结构<netinet/in.h>
		struct in6_addr
		{
			uint8_t	s6_addr[16];/*128-bit的IPv6地址.*/
			/*网络字节序*/
		};
		#define	SIN6_LEN //编译时测试
		struct sockaddr_in6
		{
			uint8_t			sin6_len;
			sa_family_t		sin6_family;
			in_port_t		sin6_port; /*网络字节序*/

			uint32_t		sin6_flowinfo;
			struct in6_addr	sin6_addr;	/*网络字节序*/

			uint32_t		sin6_scope_id;
		};



二.
#include <netinet/in.h>
1.主机字节序转网络字节序:
	uint16_t htons(uint16_t host16bitvalue); host_to_network_short(16 位)
	uint32_t htonl(uint32_t host32bitvalue); 32 位转换

2.网络字节序转主机字节序:
	uint16_t ntohs(uint16_t net16bitvalue); network_to_host_short(16 位)
	uint32_t ntohl(uint32_t net32bitvalue); 32 位转换.


#include <strings.h>
3.字节操作函数:
	void bzero(void *dest,size_t len)
	void memset(void *str,int c,size_t len); /*将len长度的str设置为 c */


#include <arpa/inet.h>
4.ASCLL 转为二进制字节序:
	IPv4:	
		int inet_aton(const char *strptr,struct in_addr *addr); ascll -> network 保存到sddr中.
		char *inet_ntoa(struct in_addr *addr);	network->ascll 点分十进制.

	IPv4 / IPv6:
		/**
		 * 	成功返回1.
		 *	输入格式不正确返回0.
		 *	失败返回-1
		 */
		int inet_pton(int family,const char *strptr,void *addr);  /*p(表达式) -> n(数值),转换后保存到addr中*/
		 
		/**
		 * [inet_ntop description]
		 * @param  family [地质族:]
		 * @param  addr   [需要转换的地址(数值格式)]
		 * @param  strptr [转换后的结果存储.不能为null,使用时,必须分配内存并指定大小]
		 * @param  len    [转换目标存储单元大小]
		 * @return        [转换后的结果指针(strptr)]
		 */
		const char *inet_ntop(int family,const void *addr,char *strptr,size_t len);


三.
#include <sys/socket.h>

	family 			说明
------------------------------------
	AF_INET			IPv4协议
	AF_INET6		IPv6协议
	AF_LOCAL		Unix域协议
	AF_ROUTE		路由套接字
	AF_KEY			秘钥套接字

	type 			说明
------------------------------------
	SOCK_STRRAM		字节流套接字
	SOCK_DGRAM		数据报套接字
	SOCK_SEQPACKET	有序分组套接字
	SOCK_RAW		原始套接字

	protocol		说明
------------------------------------
	IPPROTO_CP		TCP传输协议
	IPPROTO_UDP		UDP传输协议
	IPPROTO_SCTP	SCTP传输协议

	1. socket函数
	/**
	 * [socket description]
	 * @param  family   [协议族,]
	 * @param  type     [套接字类型]
	 * @param  protocol [使用的协议]
	 * @return          [一个非常小的套接字描述符.(非负整数)]
	 */
	int socket(int family,int type,int protocol);

	2.connect函数
	#include <sys/socket.h>
	/**
	 * @param  sockfd      [socket函数的返回值]
	 * @param  server_addr [地址结构]
	 * @param  addr_len    [地址结构的长度]
	 * 可能出现的情况:
	 * 	1.TCP客户没有收到SYN响应,返回 ETIMEDOUT.
	 * 	2.如果响应是 RST(复位).表示该服务器上并没有指定端口上的进程与之连接.
	 * 		返回 ECONNREFUSED 错误.
	 * 		出现RST的情况
	 * 			①.目的地没有对应端口没有正在监听的服务器.
	 * 			②.TCP想取消一个已有连接.
	 * 			③.TCP收到一个根本不存在的连接上的分节.
	 * 	3.客户发送的SYN在某路由器上引发 (目的地不可达)ICMP错误,认为是一种软错误,此时将错误保存起来,
	 * 		并按第一种情况继续发送SYN,若在某个规定时间仍未收到响应,则把保存的消息(ICMP错误)
	 * 		EHOSTUNREACH|ENETNUREACH返回给进程,
	 */
	int connect(int sockfd,const struct sockaddr *server_addr,socklen_t addr_len);

	3.bind函数
	#include <sys/socket.h>
	/**
	 * 将一个本地协议赋予一个套接字.(类似于MySQL绑定了本地主机和3306端口)
	 * @param  sockfd   [description]
	 * @param  addr     [description]
	 * @param  addr_len [description]
	 * @return          [description]
	 */
	int bind(int sockfd,const struct sockaddr *addr,socklen_t addr_len);


	4.listen函数
	/**
	 * 监听某个套接字.
	 * @param  sockfd  [description]
	 * @param  backlog [description]
	 * @return         [description]
	 */
	int linsten(int sockfd,int backlog);

	5.getsockname,getpeername
	#include <sys/socket.h>
	/**
	 * 返回与套接字sockfd关联的本地协议地址.
	 * @param  sockfd    [关联的套接字]
	 * @param  localaddr [用来存储本地协议地址]
	 * @param  addrlen   [协议地址长度]
	 * @return           [description]
	 */
	int getsockname(int sockfd,struct sockaddr *localaddr,socklen_t *addrlen); 

	/**
	 * 返回与套接字sockfd关联的远程协议地址
	 * @param  sockfd   [description]
	 * @param  peeraddr [description]
	 * @param  addrlen  [description]
	 * @return          [description]
	 */
	int getpeername(int sockfd,struct sockaddr *peeraddr,socklen_t *addrlen);
