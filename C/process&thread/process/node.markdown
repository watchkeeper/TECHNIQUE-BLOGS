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
下列创建的子进程数：  [参见](http://geeksforgeeks.org/wp-content/uploads/forkPuzzle4.jpg)
```C
fork();
fork() && fork() || fork();
fork();
```  

&emsp;&emsp;`fork()`应用场景：  
- 需要父、子进程同时执行不同的代码  
- 创建一个进程执行新程序，即在使用`fork()`之后立即使用`exec()`。  
&emsp;&emsp;在linux中每个用户可以创建的最大进程数是可以设置的，CHILD_MAX规定任意用户在任一时刻可以拥有的最大任务数。`fork()`在使用时都需要复制程序运行所需的一些空间，这在程序很大时将会拖慢运行时间，故产生了`vfork()`函数。`fork()`和`vfork()`有几点区别：  
- fork会将父进程的地址空间复制给子进程，而vfork则不会，而是共享同一份空间数据。
- fork<font>无法保证子进程的执行顺序；而`vfork()`会保证子进程先执行，直到子进程调用`exit()`或`exec()`
*font*

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
pid_t waitpid(pid_t pid,int * status,int options);
```

##4.<font face="consolas">exec</font>函数簇
```C

```
