#include<stdio.h>

void p1(int *p);
int main(int argc,char argv[])
{
    int i = 10,*p;
    p = &i;
    printf("地址:%p\n",p);
    printf("值:%d\n",*p);

    printf("%d\n",++*p);

    int *q; /*虽然没有对指针进出初始化，但是该指针仍然有内容，如果对其进行赋值，可能会修改对应地址的内容，损坏操作系统。*/
    printf("%p\n",q);

    return 0;
}
void p1(int *p)
{
    printf("%d\n",*p);
}
