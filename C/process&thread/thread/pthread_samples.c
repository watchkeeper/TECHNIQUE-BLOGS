/**
 *      1.全局变量 flag = 0,
 *      2.主线程中启动线程 thread-1,打印this is pthread-1,并将flag设置为1.
 *      3.主线程中启动线程 thread-2,打印this is pthread-2,并将flag设置为2.
 */

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

int flag = 0;

void* thread_1(void *arg){
    printf("this is thread-1,flag = [%d]\n",flag );
    flag = 1;
    printf("thread-1 modify flag = [%d]\n", flag);
    pthread_exit(0);
}

void* thread_2(void *arg){
    printf("this is thread-2,flag = [%d]\n", flag);
    flag = 2;
    printf("thread-2 modify flag = [%d]\n", flag);
    pthread_exit(0);
}

int main(int argc, char const *argv[]) {
    pthread_t tid_1,tid_2;
    int error_1,error_2;
    if((error_1 = pthread_create(&tid_1,NULL,thread_1,NULL)) != 0){
        printf("create thread error %s\n",strerror(error_1) );
    }

    if((error_2 = pthread_create(&tid_2,NULL,thread_2,NULL)) != 0){
        printf("create thread error %s\n", strerror(error_2));
    }

    pthread_join(tid_1,NULL);
    pthread_join(tid_2,NULL);
    printf("leave main thread..\n" );
    return 0;
}
