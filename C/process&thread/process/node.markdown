#一.进程函数
##1.fork
- 进程结构  
&emsp;&emsp;Linux下一个进程在内存里分为三个部分:**代码段**、**堆栈段**以及**数据段**.代码段存放源代码对应的数据文件;堆栈段存放程序的上下文信息,程序的局部变量等等;数据段则是保存的程序的全局变量,常数字面量以及动态数据分配的内存空间(使用`malloc()`分配的内存).

- fork定义
```C
#include <sys/types.h>
#include <sys/unistd.h>
pid_t fork();
```
&emsp;&emsp;fork译为分叉，即为原来进程创建一个完全一样的子进程。其中创建的进程会复制父进程的堆栈段和数据段（使用的是写复制），`fork()`在父进程中返回创建的子进程的进程ID，而在子进程中则返回0，所以可以通过返回值判断是子进程还是父进程。[实例](./fork.c)   
下列创建的子进程数：  
```C
fork();
fork() && fork() || fork();
fork();
```  
 子进程计算方法  
 ![参见](http://geeksforgeeks.org/wp-content/uploads/forkPuzzle4.jpg)   
&emsp;&emsp;`fork()`应用场景：  
- 需要父、子进程同时执行不同的代码  
- 创建一个进程执行新程序，即在使用`fork()`之后立即使用`exec()`。  
&emsp;&emsp;在linux中每个用户可以创建的最大进程数是可以设置的，CHILD_MAX规定任意用户在任一时刻可以拥有的最大任务数。`fork()`在使用时都需要复制程序运行所需的一些空间，这在程序很大时将会拖慢运行时间，故产生了`vfork()`函数。`fork()`和`vfork()`有几点区别：  
- fork会将父进程的地址空间复制给子进程，而vfork则不会，而是共享同一份空间数据。
- fork<font>无法保证子进程的执行顺序；而`vfork()`会保证子进程先执行，直到子进程调用`exit()`或`exec()`


##2.wait
```C
#include <sys/types.h>
#include <sys/wait.h>
pid_t wait(int * statloc);
```
##3.waitpid
```C
#include <sys/types.h>
#include <sys/wait.h>
pid_t waitpid(pid_t pid,int * status,int options); // status 退出的状态
```

##4.exec函数簇  
&emsp;&emsp;`exec()`函数簇是一系列以exec开头的函数，功能均为根据文件名找到可执行文件并执行，在执行`exec()`方法后，会替代原来的方法，即所谓的旧瓶装新酒喽，仅仅保留原进程的进程号。声明如下：
```C
#include <unistd.h>
int execl(const * char pathname,const * char arg0,...); // l list
int execv(const * char pathname,const * char args[]);   // v vector(数组)
int execle(const * char pathname,const * char arg0,...,const * char envp[]);
int execve(const * char pathname,const * char args[],const * char envp[]);
int execlp(const * char pathname,const * char arg0,...);
int execvp(const * char pathname,const * char args[]);
```  
&emsp;&emsp;函数分类  

|函数     |    查找方式       |     参数传递方式              |      环境变量                          |
| :--:     | :--:              | :---------------:            | :----------------:| :---------------: |
|`execl`  | 根据完整目录名进行查找*pathname* |  以列举参数的形式进行传递 |          不能设置         |
|`execv`  |    √               | 以数组的方式传递             |          √        |
|`execle` |√|以列举参数的形式进行传递|以envp进行穿点环境变量|
|`execve` |√|以数组的方式传递|√|
|`execlp` |根据系统环境变量查找名为*pathname*的文件|以列举参数的形式进行传递|不能显视设置|
|`execvp` |√ |以数组的方式传递|√|


##5.进程退出
###1.进程终止方式  
####1.正常终止  
- 在`main()`中执行return，等效于`exit()`。  
- 调用`exit()`，该函数由**ISO C** 定义，在执行该函数之后，会先调用各种自定义的终止处理程序（在`atexit()`中注册），然后关闭所有的IO流。  

```C
#include <stdlib.h>

void exit(int status); // status 状态码
```  
- 调用`_exit()`或`_Exit()`，在调用这两个方法之后，不会再去执行自定义的终止方法，而是交由内核处理，是否冲洗IO，则是由具体实现决定。   

```C
#include <stdlib.h>
void _Exit(int status);


#include <unistd.h>
void _exit(int status);
```  
`_Exit()`由**ISO C**定义，而`_exit()`则是由**POSIX.1**定义。`_exit()`由`exit()`调用，处理系统细节。

- 进程的最后一个线程调用`return`，而该线程返回的值不作为进程的退出码，而依然以 **0** 作为终止状态返回。
- 进程的最后一个线程调用 `pthread_exit()`，此时进程的终止状态依然是 0.  
####2.终止注册函数   
&emsp;&emsp;`atexit()` 是用户用于自定义终止函数使用，一个进程最多可以注册32个终止函数，由   `exit()` 调用，    [参见使用方法](./fork.c) ，其定义如下：  
```C
#include <stdlib.h>
int atexit(void * (fun)(void)); //fun 为需要执行的终止程序。
```

####3.异常终止  
- 调用`abort()`，将会产生一个 **SIGABRT** 信号
- 当进程接收到某些特定的信号时。
- 当最后一个线程对 **取消** 作出响应。
