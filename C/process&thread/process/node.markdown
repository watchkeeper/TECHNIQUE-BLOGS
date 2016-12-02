#一.进程函数
##1.fork
- 进程结构

  Linux下一个进程在内存里分为三个部分:**代码段**,**堆栈段**以及**数据段**.代码段存放源代码对应的数据文件;
  堆栈段存放程序的上下文信息,程序的局部变量等等;数据段则是保存的程序的全局变量,常数字面量以及动态数据分配的内存空间(使用malloc分配的内存).

- fork定义
```C
#include <sys/types.h>
#include <sys/unistd.h>
pid_t fork();
```
fork译为分叉,即为原来进程创建一个完全一样的子进程.其中创建的进程会复制父进程的堆栈段和数据段,fork函数在父进程中返回创建的子进程的进程ID,而在子进程中则返回0,所以可以通过返回值判断是子进程还是父进程.[实例](./fork.c)



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

##4.exec函数簇
```C

```
