#include <sys/wait.h>
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

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
    return 0;
}

void other() {
    fork();
    fork() && fork() || fork();
    fork();
}
