/********************************************************
 * Name:param.c                                         *
 * Purpose:测试参数的接收                               *
 * Author:snails                                        *
 * *****************************************************/

#include <stdio.h>
#define TRUE 1
#define FALSE 0
void param();
int main(int argc, char* argv[])
{
    
    if(FALSE)
        printf("var total is %d\n",argc);
    int i = 0;
    for(;i < argc; i++){
        printf("argv[%d] is %s\n",i,argv[i]);
    }
    param();
    param();
    return 0;
}
void param()
{
    static int stat_par = 0;
    printf("static param is : %d\n",stat_par++);
}
