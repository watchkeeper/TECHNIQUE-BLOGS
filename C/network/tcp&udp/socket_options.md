套接字选项：
    #incolude <sys/socket.h>
    int getsockopt(int sockfd,int level,int optname,void *optval,socklen_t *optlen);
    int setsockopt(int sockfd,int level,int optname,const void* optval,socklen_t *optlen);
        sockfd  :指向一个打开的套接字描述符
        level   :解释选项的代码为通用套接字，或者时某个特定的协议（TCP，IP，SCTP等）
        optval  :指向某个变量的指针（setsockopt从变量中获取需要设置的新值，getsockopt则是从变量中获取满足条件的大小由最后一个参数指定）
        optlen  :指定optval的大小
