#1 recvfrom()  &  sendto()  
- recvfrom  
```C
#include <sys/socket.h>
/**
 *  from : 表示来源地址.
 *  return: 读写的数据长度
 *  addrlen : 值-地址形式
 */
ssize_t recvfrom(int sockfd,void * buff,size_t nbytes,int flags,
				struct sockaddr * from,socklen_t * addrlen);
```
- sendto  
```C
/**
 * return: 读写的数据长度
 * addrlen : 只是一个整数.
 */
ssize_t sendto(int sockfd,const void * buff,size_t nbytes,int flags,
				const struct sockaddr * to,socklen_t * addrlen);
```
&emsp;&emsp;因为 **UDP** 是无连接的,所以发送和接收需要加上地址信息.

#2 一个UDP套接字多次调用connect时  
        指定新的IP地址和端口号（TCP套接字只能用一次，即不能再次调用connect函数）
        断开套接字(需要将sin_family 或sin6_family设置为AF_UNSPEC)
