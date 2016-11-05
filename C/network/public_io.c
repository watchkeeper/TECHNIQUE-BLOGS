#include "inetio.h"

/**
 * 从一个描述读取 n 个字节
 * @param  vptr [被读取的描述符]
 * @param  n    [需要读取的字节数]
 */
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

/**
 * 往描述符中写入n个字节
 * @param  fd   [description]
 */
ssize_t writen(int fd,const void *vptr,size_t n)
{
	size_t nleft = n;
	ssize_t nwritten;
	const char *ptr;
	ptr = vptr;

	while(nleft > 0){
		if((nwritten = write(fd,ptr,nleft)) <= 0){
			if(nwritten < 0 && errno == EINTR)
				nwritten = 0;
			else
				return -1;
		}
		nleft -= nwritten;
		ptr += nwritten;
	}
}

ssize_t readline(int fd,void *vptr,size_t maxlen)
{
	ssize_t n,rc;
	char c,*ptr;
	ptr = vptr;
	for(n = 1; n < maxlen; n++){
		again:
			if((rc = read(fd,&c,1)) == 1){
				*ptr++ =  c;
				if(c == '\n')
					break;
			}else if (rc == 0){
				*ptr = 0;
				return (n-1);
			}else{
				if(errno == EINTR)
					goto again;
				return (-1);
			}
	}
	*ptr = 0;
	return (n);
}

