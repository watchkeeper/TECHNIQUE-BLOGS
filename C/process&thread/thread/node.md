线程和进程对比<br>

|进程|线程|说明|
| :--: | :--: | :--: |
|`fork`|`pthread_create`|创建新的进程（线程）|
|`exit`|`pthread_exit`|从现有进程（线程）中退出|
|`waitpid`|`pthread_join`|从控制流中得到退出状态|
|`atexit`|`thread_cleanup_push`|注册在退出控制流时调用的函数|
|`getpidp`|`pthread_self`|获取当前进程（线程）ID|
|`abort`|`pthread_cancer`|非正常退出控制流|

#1 线程相关方法  
##1.1 线程创建  
```C
#include <pthread.h>
int pthread_create(pthread_t * restrict tidp,
                    const pthread_attr_t * restrict attr,
                    void * (* start_routine)(void * ),
                    void *restrict arg);
返回值：成功返回0，失败返回错误编码
```
&emsp;&emsp;pthread_t 为线程ID对应数据类型，tidp 用户存储创建线程成功后对应的线程ID号；attr设置不同的属性，如果为NULL，则使用默认的设置。线程创建成功后，将从 `start_rtn` 函数开始执行，该函数接收一个 **arg** 的参数，返回值为 **(void * )** 。  

##1.2 线程终止   
- 正常调用return退出。
- 线程自身调用 `thread_exit()`
- 其他线程调用`thread_join()`  

```C
#include <pthread.h>
int pthread_exit(void * rval_ptr);

int pthread_join(pthread_t tid,void ** rval_ptr);
```  
`pthread_join()` 会使得调用函数一直阻塞，知道指定的线程终止，如果指定线程只是从它的例程中返回（return），**rval_ptr** 将保存状态码；如果线程被取消，则**rval_ptr** 指定的内存单元将被设置为**PTHREAD_CANCELED**.  
##1.3 获取线程信息  

```C
#include <pthread.h>
pthread_t pthread_self(void);
    // 返回当前线程的 ID

int pthread_equal(pthread_t tid1,pthread_t tid2);
    //若两个线程ID相等返回非0，否则返回0
```
 &emsp;&emsp;此外，在编译线程相关方法时，需要使用`pthread` 参数 `gcc -pthread -o run thread.c`，[方法使用参考](./thread.c)

#2 线程属性  
##2.1 pthread_attr_t 原型

```C
typedef struct {
    int detachstate;    //线程分离状态
    int schedpolicy;    //线程调度策略
    struct sched_param schedparam ;//线程调度参数
    int inheritsched;   //线程继承性
    int scope;          //线程作用域
    size_t guardsize;   //线程栈末尾的警戒缓冲区大小
    int stackaddr_set;  //
    void * stackaddr;   //线程栈位置
    size_t stacksize;   //线程栈大小

}pthread_attr_t;
```   

&emsp;&emsp;线程的属性用`pthread_attr_t` 表示，在使用该结构体时，必须对其进行初始化（`pthread_attr_init()`），使用完成之后去除掉（`pthread_attr_destory`）初始化的内容.   
```C
#include <pthread.h>

int pthread_attr_init(pthread_attr_t * attr);
int pthread_attr_destory(pthread_attr_t * attr);
    成功返回0，失败返回-1
```   
&emsp;&emsp;在对线程属性进行初始化时，线程的属性即是 **操作系统实现支持的线程所有属性** ，如果线程初始化时被赋予动态内存空间，那在*destory* 时，将会对分配的空间初始化无意义的值，因此被`pthread_attr_destory()` 的属性值不能再被使用（`pthread_create()`）。

##2.2 各属性  
- 分离状态    
&emsp;&emsp;分离状态表示当前线程和当前线程创建线程之间的联系，对于分离状态：被创建的线程如果运行结束，则自动释放资源；而对于非分离状态：只有当当前线程调用`pthread_join()`返回时，线程资源才会被释放。分离状态设置与获取：   
```C
#include <pthread.h>
int pthread_attr_getdetachstate(const pthread_attr_t * attr,int * detachstate);
int pthread_attr_setdetachstate(pthread_attr_t * attr,int detachstate);
                                                    成功返回0,失败返回-1
                                                    detachstate: PTHREAD_CREATE_DETACHED  分离状态
                                                                 PTHREAD_CREATE_JOINABLE  非分离状态

extern int pthread_detach (pthread_t th_id);  //将某个线程设置为分离状态
```   

- 继承性  
&emsp;&emsp;继承性表示线程的调度是从进程中直接继承还是手动设置（**schedpolicy** 和 **schedparam** 设置），设置和获取继承性：  
```C
#include <pthread.h>
int pthread_attr_getinheritsched(const pthread_attr_t * attr,int * inheritsched);
int pthread_attr_setinheritsched(pthread_attr_t * attr,int inheritsched);

                    成功返回0,失败返回-1
                    inheritsched:  PTHREAD_INHERIT_SCHED   新线程继承原来线程的调度策略
                                   PTHREAD_EXPLICIT_SCHED  使用schedparam 和 schedpolicy 设置的调度策略
```   

- 线程调度策略   
&emsp;&emsp;调度策略获取、设置   
```C
#include <pthread.h>
int pthread_attr_getschedpolicy(const pthread_attr_t * attr,int * policy);
int pthread_attr_setschedpolicy(pthread_attr_t * attr,int policy);
            成功返回0,失败返回-1
            policy: SCHED_FIFO   先进先出
                    SCHED_RR     轮转法
                    SCHED_OTHER  其他策略
```  
**SCHED_FIFO** : 只有当自身阻塞或有更高优先级的线程需要运行才会放弃执行权，当一个线程准备好执行时，除非有更高优先级的线程正在执行，否则该线程会很快获得执行权利。<br>
**SCHED_RR**   : 按时钟片段进行轮换执行，当某个线程执行的时间超过了拥有的时间片段，则会被其他线程抢占执行权利。
&emsp;当线程因为某些原因被阻塞等待时，会根据不同的优先级被唤醒，优先级越高的先被唤醒。  
- 调度参数   
&emsp;&emsp;参数的设置和获取  

```C
#include <pthread.h>
int pthread_attr_getschedparam(const pthread_attr_t * attr,struct sched_param * param);
int pthread_attr_setschedparam(pthread_attr_t * attr,const struct sched_param * param);
        成功返回0,失败返回-1

#include "/usr/include/bits/sched.h"
struct sched_param{
    int sched_priority;  // 线程优先权
};

//获取系统支持的最大和最小优先权
#include <pthread.h>
int sched_get_priority_max(int priority);
int sched_get_priority_min(int priority);
                成功返回0,失败返回-1
```  

- 线程作用域   
&emsp;&emsp;作用域表示线程是在进程内进行资源的竞争还是在系统级别资源竞争。设置方法如下：  
```C
#include <pthread.h>
int pthread_attr_setscope(pthread_attr_t * attr,int scope);
int pthread_attr_getscope(const pthread_attr_t * attr,int * scope);
                成功返回0,失败返回-1
                scope   PTHREAD_SCOPE_PROCESS (进程内竞争)
                        PTHREAD_SCOPE_SYSTEM  (系统内竞争)
```

- 线程堆栈大小  
&emsp;&emsp;设置方法：  
```C
#include <pthread.h>
int pthread_attr_getstacksize(const pthread_attr_t * restrict attr,size_t * restrict stacksize);
int pthread_attr_setstacksize(pthread_attr_t * attr ,size_t * stacksize);
                成功返回0,失败返回-1

```   

- 线程堆栈地址   
```C
#include <pthread.h>
int pthread_attr_getstackaddr(const pthread_attr_t * attr,void ** stackaddf);
int pthread_attr_setstackaddr(pthread_attr_t * attr,void * stackaddr);
                成功返回0,失败返回-1
```

- 线程栈末尾的警戒缓冲区大小   
```C
int pthread_attr_getguardsize(const pthread_attr_t * restrict attr,size_t * restrict guardsize);
int pthread_attr_setguardsize(pthread_attr_t * attr ,size_t * guardsize);
                成功返回0,失败返回-1
```  
&emsp;&emsp;线程属性guardsize控制着线程栈末尾之后以避免栈溢出的扩展内存大小。这个属性默认设置为PAGESIZE个字节。可以把guardsize线程属性设为0，从而不允许属性的这种特征行为发生：在这种情况下不会提供警戒缓存区。同样地，如果对线程属性stackaddr作了修改，系统就会假设我们会自己管理栈，并使警戒栈缓冲区机制无效，等同于把guardsize线程属性设为0。

#3 线程其他  
##3.1 互斥锁   
```C
#include <pthread.h>

int pthread_mutex_lock(pthread_mutex_t * mptr);
int pthread_mutex_unlock(pthread_mutex_t * mptr);
    成功返回0,失败返回Exxx
```
&emsp;&emsp;互斥锁将某个资源进行加锁，使得同一个时间只能有一个线程对其进行操作。在使用之前需要先声明一个 `pthread_mutex_t` 类型的变量作为线程的锁，使用 `pthread_mutex_lock()` 对资源进行加锁，使用 `pthread_mutex_unlock()` 对资源解锁。  

##3.2 线程同步  

```C
#include <pthread.h>

int pthread_cond_wait(pthread_cond_t * cptr, pthread_mutex_t * mptr);   //等待资源为真
int pthread_cond_signal(pthread_cond_t * cptr);   // 唤醒某个线程
//Both return: 0 if OK, positive Exxx value on error
//
int pthread_cond_broadcast (pthread_cond_t * cptr); // 唤醒等待某个条件的所有线程

```   
&emsp;&emsp;同步即是保证在同一个时间内的操作都为原子操作，不会有其他线程进行干扰。
