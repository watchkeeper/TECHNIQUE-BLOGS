#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <strings.h>
#include <arpa/inet.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <errno.h>

#define PUBLIC_HOST 127.0.0.1
#define PUBLIC_PORT 12345
#define  MAXLINE 1024

/**
 * 从一个描述符读取 n 个字节
 * @param  vptr [被读取的描述符]
 * @param  n    [需要读取的字节数]
 */
ssize_t readn(int fd,void *vptr,size_t n);

/**
 * 往描述符中写入n个字节
 * @param  fd   [description]
 */
ssize_t writen(int fd,const void *vptr,size_t n);

ssize_t readline(int fd,void *vptr,size_t maxlen);
