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

        ----------SOL_SOCKET----------------------------------------------------------------------------------------
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
            3.l_onoff != 0 && l_linger != 0,在套接字关闭时， 内核将延迟一段时间，直到缓冲区中数据被发送完成.
        SO_RCVBUF   :接收缓冲区大小 int
        SO_SNDBUF   :发送缓冲区大小 int
            分别设置接收和发送缓冲区的保留大小.其值与SO_MAX_MSG_SIZE 或 TCP滑动窗口无关,它会保存接收到的数据,一直到应用进程来读取.
            其中TCP不可能溢出,因为不允许对方发送超过通告窗口大小,即流量控制;而UDP则没有该限制,如果发生溢出,会将数据丢弃.
        SO_RCVLOWAT :接收缓冲区下限 int
        SO_SNDLOWAT :发送缓冲区下限 int

        SO_RCVTIMEO :接收超时  struct timeval
        SO_SNDTIMEO :发送超时  struct timeval
        SO_REUSERADDR   :允许重用本地地址和端口    int
        SO_EXCLUSIVEADDRUSE :禁止重用地址和端口    int
        SO_TYPE     :获得套接字类型 int
        SO_BSDCOMPAT:与BSD系统兼容 int

        ------------------------------------------------------------------------------------------------------------
        ----------------IPPROTO_IP----------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------
        IP_HDRINCL  :在数据包中包含IP首部(即自己添加IP首部),可以用于隐藏自己IP地址.
        IP_OPTIONS  :IP首部选项 int
        IP_TOS      :服务类型
        IP_TTL      :生存时间 int

        ------------------------------------------------------------------------------------------------------------
        ------------------------IPPROTO_TCP-------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------
        TCP_MAXSEG  :允许设置TCP最大分节大小(MSS).
        TCP_NODELAY :禁止TCP 的Nagle算法.



        -----------------------fcntl()函数--------------------------------------------------------------------------
        #include <fcntl.h>
        int fcntl(int fd,int cmd,.../*int arg*/);
        1.非阻塞式I/O.通过使用F_SETFL命令设置O_NONBLOCK文件状态标识,即把一个套接字设置为非阻塞型.
        2.信号驱动式I/O,通过F_SETFL命令设置O_ASYNC文件状态标识,将套接字设置为:一旦状态发生变化,内核就会产生一个SIGIO信号.
        3.F_SETOWN指定接收SIGIO和SIGUGR信号的套接字宿主(进程ID或进程组ID).
            SIGIO:套接字被设置为信号驱动式I/O后产生的
            SIGUGR:在新的带外数据到达套接字时产生的.
        4.F_GETOWN:返回当前套接字宿主.

        设置套接字标志:(不能直接设置套接字状态标志,应该先获取当前标志,与新标志逻辑或后再设置标志)
        int flags;
        if((flags = fcntl(fd,F_GETFL,0)) < 0)
            err_sys("F_GETFL error");
        flags |= O_NONBLOCK;
        if(fcntl(fd,F_SETFL,flags) < 0)
            err_sys("F_SETFL error");

        关闭非阻塞状态:
        flags &= ~O_NONBLOCK;
        if(fcntl(fd,F_SETFL,flags) < 0)
            err_sys("F_SETFL error");
