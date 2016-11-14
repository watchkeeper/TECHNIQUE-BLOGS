套接字选项：
    #incolude <sys/socket.h>
    int getsockopt(int sockfd,int level,int optname,void *optval,socklen_t *optlen);
    int setsockopt(int sockfd,int level,int optname,const void* optval,socklen_t *optlen);
        sockfd  :指向一个打开的套接字描述符
        level   :解释选项的代码为通用套接字，或者时某个特定的协议（TCP，IP，SCTP等）
        optval  :指向某个变量的指针（setsockopt从变量中获取需要设置的新值，getsockopt则是从变量中获取满足条件的大小由最后一个参数指定）
        optlen  :指定optval的大小
    level:
        SOL_SOCKET  ：基本套接口
        IPPROTO_IP :IPv4套接字接口
        IPPROTO_TCP:TCP套接口
        IPPROTO_IPV6: IPv6套接口
        ----------SOL_SOCKET----------------
        SO_BROADCAST    : 允许发送广播数据 ，适用于UDP socket，允许UDP socket广播信息到网络上。
        SO_DEBUG        : 允许调试 int
        SO_DONTROUTE    : 不查找路由，即绕过底层的路由。int
        SO_ERROR        : 获取套接字错误 int
        SO_KEEPALIVE    : 保持连接 int;检测对方机是否崩溃，避免永远阻塞于TCP连接的输入。设置该选项后，如果2小时内在套接字两方
                        都没有发生一次数据交换，TCP就自动给对方发送一个 保持存活探测分节（keep-alive probe），这是必须响应的
                        TCP分节，会导致三种情况：
                            1.对端以期望的ACK响应
                            2.对端以RST响应，告诉本端TCP，对端已经崩溃且重新启动，套接字待处理错误置为ECONNRESET，套接字本身被关闭。
                            3.没有任何响应，TCP 在75秒后重新发送8个探测字节，在第一个探测字节发送11分15秒内若没有任何响应则放弃，
                            套接字本身被关闭。

        SO_LINGER       : 指定close()函数对面向连接的协议如何操作
                struct linger{
                    int l_onoff;
                    int l_linger;
                }
            1.l_onoff = 0 ,此时l_linger 值被忽略，连接被立即关闭。
            2.l_onoff !=0 && l_linger = 0 , 此时立即关闭连接，即丢弃保留在缓存区中数据，并且发送一个RST 到对端，没有通常的4分组终止序列。
            3.l_onoff != 0 && l_linger != 0,在套接字关闭时， 内核将延迟一段时间，直到缓冲区中数据被发送完成，
