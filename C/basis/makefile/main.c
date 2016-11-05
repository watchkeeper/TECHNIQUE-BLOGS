#include <stdio.h>
#include "max.h" // 引入头文件.max.c的话相当于将该文件中的所有内容复制到本文件中。所以推荐先编译为.o文件
#include "min.h"

int main()
{
    int a = 12;
    int b = 20;
    int maxNum = max(a,b);
    int minNum = min(a,b);
    printf("the max num is %d\nthe min num is %d\n",maxNum,minNum);
    return 0;
}
