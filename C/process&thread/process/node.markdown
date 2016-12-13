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


##2.等待子进程终止状态  
&emsp;&emsp;当一个进程正常或者异常终止时，内核就向其父进程发送 **SIGCHLD** 信号。父进程可以选择忽略该信号，或者提供一个该信号发生时即被调用的函数(信号处理程序)。对于这种信号的系统默认动作是忽略它。内核为每个终止进程保存了一定量的信息，包括进程 `ID`、该进程的终止状态、以及该进程使用的 *CPU* 时间总量。所以,当终止进程的父进程调用 `wait()` 或者 `waitpid()` 函数，即可获取到这些信息。当父进程获取终止进程的终止信息之后，内核就可以释放终止进程所使用的所有存储区、关闭其所有打开的文件。在 UNIX 术语中，一个已经终止、但是其父进程尚未对其进行善后处理(获取终止子进程的相关信息)的进程被称为僵尸进程（**zombie**）。如果编写一个长期运行的程序，调用 `fork()` 产生子进程之后，需要调用   `wait()` 来获取这些子进程的终止状态，否则这些子进程在终止之后将会变成僵尸进程
###2.1.wait
```C
#include <sys/types.h>
#include <sys/wait.h>
pid_t wait(int * statloc); //statloc 进程终止状态。
```   
- 如果不存在子进程，则返回错误。
- 如果所有字进程都在运行，则阻塞。
- 如果一个字进程已经终止，正在等待父进程获取终止状态，获取该进程状态然后返回。  
获取初始状态的信息宏：  

| 宏 | 说明 |
| :--: | :--: |
| `WIFEXITED(status)` |正常返回为**true**，可以通过`WEXITSTATUS(status)`获取`exit()`终止状态的低8位  |
|`WIFSIGNALED(status)`|如果为异常终止则返回 **true** ，`WTERMSIG(status)`返回使得进程终止的信号|
|`WIFSTOPPED(status)`|若为当前暂停子进程返回的状态,则为真|
|`WIFCONTINUED(status)`|若在作业控制暂停后已经继续的子进程返回了状态,则为真|

###2.2.waitpid
```C
#include <sys/types.h>
#include <sys/wait.h>
pid_t waitpid(pid_t pid,int * status,int options); // status 退出的状态，返回进程ID
```   
- pid == -1 等待任一进程，和`wait()` 类似
- pid > 0 等待对应的进程
- pid < -1 等待进程组*ID*等于*pid*绝对值的任一子进程
- pid == 0
&emsp;&emsp;如果指定的进程或进程组不存在，又或者指定的进程不是当前进程的子进程，那么将出错，`waitpid()`可以通过`options`让函数不阻塞。  
options选项值：

| 值 | 说明 |
| :--: | :--: |
|**0**|效果和`wait()`一样，会阻塞（`wait(&status)` `waitpid(-1,&satatus,0)` 作用一样）|
|**WNOHANG**|由pid指定的进程仍然在正常运行，则`waitpid()`并不会阻塞，立即返回 0|
|**WCONTINUED**|由 pid 指定的任一子进程在暂停后已经继续,但其状态尚未报告,则返回其状态|
|**WUNTRACED**|由 pid 指定的任一子进程已处于暂停状态,并且其状态自暂停以来还未报告过,则返回其状态|

##3.exec函数簇  
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


##4.进程退出
###4.1.进程终止方式  
####4.1.1.正常终止  
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

####4.1.2.终止注册函数   
&emsp;&emsp;`atexit()` 是用户用于自定义终止函数使用，一个进程最多可以注册32个终止函数，由   `exit()` 调用，    [参见使用方法](./fork.c) ，其定义如下：  
```C
#include <stdlib.h>
int atexit(void * (fun)(void)); //fun 为需要执行的终止程序。
```

####4.1.3.异常终止  
- 调用`abort()`，将会产生一个 **SIGABRT** 信号
- 当进程接收到某些特定的信号时。
- 当最后一个线程对 **取消** 作出响应。
