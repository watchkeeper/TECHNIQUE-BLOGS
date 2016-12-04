#include<stdio.h>
main
#define ECHO(str) do{\
                        scanf("%s",str);\
                        printf("%s",str);\
                  }while(0)
#define N 123
int main(int argc,char *argv)
{
    char str1[N]; 
    ECHO(str1);
    printf("N=%d\n",N);
    #undef N
    return 0;
}
