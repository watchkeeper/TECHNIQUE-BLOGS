#include <sys/wait.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <strings.h>
#include <string.h>
#include <errno.h>
#define MAXLINE 1024

/**
 * 创建新进程
 */
int main(int argc, char const *argv[]) {
    char buf[MAXLINE];
    pid_t pid;
    int status;

    printf("%% " );
    //接收输入的命令行
    while (fgets(buf, MAXLINE, stdin) != NULL) {
        if(buf[strlen(buf) - 1] == '\n')
            buf[strlen(buf) - 1] = 0; //将换行符replace为0

        //创建子进程执行输入的命令行。
        if((pid = fork()) < 0){
            strerror(errno);
            exit(EXIT_FAILURE);
        }else if(pid == 0){
            //执行命令行.
            execlp(buf, buf, (char *)0);
            exit(123);
        }

        if((pid = waitpid(pid, &status, 0)) < 0){
            strerror(errno);
            exit(EXIT_FAILURE);
        }

        printf("%%" );
    }


    exit(0);
}
