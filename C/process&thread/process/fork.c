#include <sys/wait.h>
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

void _exit_1() {
    printf("this is exit func %s\n" );
}

int main(int argc, char const *argv[]) {
    pid_t pid;
    if((pid = fork()) < 0){
        strerror(errno);
        exit(-1)
    }
    if(pid == 0){ // 子进程
        printf("this is child process %d\n",(int)getpid() );
        // dothing();
        exit(0);
    }
    if ((pid = wait(NULL)) < 0) {
        printf("wait error %s\n", strerror(errno));
    }
    atexit(_exit_1); //将_exit_1 注册为自定义终止程序。
    return 0;
}
/*fork其他的用法19*/
void other() {
    fork();
    fork() && fork() || fork();
    fork();
}
/*计算fork产生的进程数规律*/
void count() {
    for (;;) { /* 循环次数：n 子进程数 ： 2^n - 1*/
        fork();
    }
}
