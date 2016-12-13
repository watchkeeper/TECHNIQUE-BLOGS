#include <pthread.h>
#include <stdlib.h>
#include <stdio.h>

void *my_thread_1(void *arg){
    printf("my_thread_1 was called main thread ...my thread id is (%lu)\n",pthread_self() );
    pthread_exit((void *)1);
}

void *my_thread_2(void *arg){
    printf("my_thread_2 was called main thread ...my thread id is (%lu)\n",pthread_self() );
    pthread_exit((void *)2);
}

int main(int argc, char const *argv[]) {
    pthread_t tid1,tid2;
    int err;
    void * tret;

    /*创建线程1*/
    if((err = pthread_create(&tid1,NULL,my_thread_1,NULL)) != 0){
        printf("can't create thread 1 : %s\n",strerror(err) );
        exit(-1);
    }

    /*创建线程2*/
    if((err = pthread_create(&tid2,NULL,my_thread_2,NULL)) != 0){
        printf("can't create thread 2 : %s\n",strerror(err) );
        exit(-2);
    }

    //会一直阻塞，知道对应的线程退出
    if((err = pthread_join(tid1,&tret)) != 0){
        printf("can't join thread 1 exit %s\n", strerror(err));
        exit(-1);
    }
    printf("thread 1 exit code(%d)%s\n",(int)tret );

    if((err = pthread_join(tid2,&tret)) != 0){
        printf("can't join thread 2 exit %s\n", strerror(err));
        exit(-1);
    }
    printf("thread 2 exit code(%d)%s\n",(int)tret );
    return 0;
}
