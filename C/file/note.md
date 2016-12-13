#1 字符的输入输出:    

- 输出:
```C
int fputc(int c,FILE * stream);
int putc(int c,FILE * stream);
int putchar(int c);
```
&emsp;&emsp;putchar : 向标准输出流输出数据.而putc和fputc则是更通用的版本.其中putc一般是作为宏来实现,fputc作为函数使用,一般偏好使用putc.

- 输入:
```C
int fgetc(FILE * stream); /*从任意流中读取字符 */
int getc(FILE　* stream);
int getchar(void); /* 从标准输入流中读取数据 */
int ungetc(int c,FILE * stream);
```

#2 字符串的输入输出
- 输出:
```C
/*不会自动添加换行符,当出现错误,均返回EOF*/
int fputs(const char * s,FILE * stream);
int puts(const char * s);
```

- 输入:
```C
/*s:存储的地方,n允许存储的容量*/
char * fgets(char * s,int n,FILE * stream);
char *fgets(char * s);
```

#3 打开文件  
```C
#include<fcntl.h> 成功返回文件描述符，失败返回-1
open(const char * path,int oflag,...)
openat(int fd,const char * path,int oflag,...)
```
`path`:需要打开或创建文件的名字。
`fd`：若`path`是绝对路径名，此时忽略`fd`，`openat`相当于`open`
    若`path`是相对路径，`fd`指出了相对路径名在文件系统中的开始地址


#4 lseek函数  
```C
#include<unistd.h>
off_t lseek(int fd,off_t offset,int whence); //为一个文件设置偏移量。成功返回偏移量
```
        whence :SEEK_SET 文件的偏移量为文件开始处offset个字节
                SEEK_CUR 文件偏移量为当前值加offset（正负均可）
                SEEK_END 偏移值为文件长度加offset（正负均可）

    空洞文件：当偏移量大于文件长度，下一次对文件进行写操作将扩大该文件，并且从文件原末尾到现在偏移文件之间将被设置为0,构成空洞。
            其中空洞并不为其分配磁盘块
