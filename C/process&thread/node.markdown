#一.进程函数
##1.fork
- 进程结构

  Linux下一个进程在内存里分为三个部分:代码段,堆栈段以及数据段.

- 代码
```C
#include <sys/types.h>
#include<sys/unistd.h>
pid_t fork();
```
##2.wait
```C
#include <sys/types.h>
#include<sys/wait.h>
pid_t wait(int \*statloc);
```
##3.waitpid
```C
#include <sys/types.h>
#include <sys/wait.h>
pid_t waitpid(pid_t pid,int \*status,int options);
```

##4.exec函数簇
