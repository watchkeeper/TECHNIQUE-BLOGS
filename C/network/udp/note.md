1.recvfrom()  &  sendto();
	#include <sys/socket.h>
	/**
	 *  from : 表示来源地址.
	 *  return: 读写的数据长度
     *  addrlen : 值-地址形式
	 */
	ssize_t recvfrom(int sockfd,void *buff,size_t nbytes,int flags,
					struct sockaddr *from,socklen_t *addrlen);

	/**
	 * return: 读写的数据长度
     * addrlen : 只是一个整数.
	 */
	ssize_t sendto(int sockfd,const void *buff,size_t nbytes,int flags,
					const struct sockaddr *to,socklen_t *addrlen);

	因为UDP是无连接的,所以发送和接收需要加上地址信息.
