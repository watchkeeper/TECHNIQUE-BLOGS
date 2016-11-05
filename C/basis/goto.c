/*
 * Purpose : goto使用
 *
 *
 */
#include<stdio.h>

int main(int argc , char argv[])
{
    int i;
    for(i = 0 ; i < 10; i++){
        if(i == 3)
            goto _3;
    }
    _3:
    printf("this is goto %d\n",i);

}
