#1.打印错误消息：
```C
#include <string.h>
char *strerror(int errnum);将errnum（通常为errno）映射为一个出错消息，并且返回此错误消息

#include<stdio.h>
void perror(const char * msg);基于errno的标准错误消息，产生一条错误消息，然后返回，首先输出msg的值，然后：，接着是errno对应的错误信息
```


#2.定义宏函数
```C
#define ECHO(str) do{\
                        scanf("%s",str);\
                        printf("%s",str);\
                  }while(0)

```
