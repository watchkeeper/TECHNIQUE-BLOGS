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
                    void * (* start_rtn)(void * ),
                    void restrict arg);
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
