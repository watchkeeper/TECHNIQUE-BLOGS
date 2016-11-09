#include <stdio.h>
#include <errno.h>
#include <stdlib.h>
#include <sys/types.h>
#include <netinet/in.h>
/**
 *  * 从一个描述读取 n 个字节
 *   * @param  vptr [被读取的描述符]
 *    * @param  n    [需要读取的字节数]
 *     */
ssize_t readn(int fd,void *vptr,size_t n)
{
	size_t nleft = n;
	ssize_t nread;
	char *ptr;
	ptr = vptr;

	while(nleft > 0){
		/** read(fd,ptr,nleft) 如果正常读取,应该读取到nleft个字节,但在很多情况下读取到,所以需要将其全部读取. */
		if((nread = read(fd,ptr,nleft)) < 0){
			if(errno == EINTR)
				nread = 0;
			else
				return -1;
		}else if(nread == 0)
			break;
		nleft -= nread;
		ptr += nread;
	}
	return (n - nleft);
}

