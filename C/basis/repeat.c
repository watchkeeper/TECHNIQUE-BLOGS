#include<stdio.h>
#define false 0
#define true 1
typedef int Bool;

int main(int argc, char argv[])
{
    Bool digit_seen[10] = {0};
    int n;
    int digit;
    printf("n:%d\n",n);
    printf("enter num\n");
    scanf("%d",&n);
    printf("原始值:%d\n",n);
    while(n > 0){
        digit = n % 10;
        if(digit_seen[digit])
            break;
        digit_seen[digit] = true;
        n /= 10;  //如果没有出现重复，则会一直走这句，最后n的值变为0
        printf("n:%d\n",n);
    }
    if(n > 0)
        printf("n have repeated\n");
    else
        printf("n not repeated\n");
    return 0;
}
