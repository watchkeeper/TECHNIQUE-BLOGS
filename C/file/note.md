1.字符的输入输出:
    输出:
        int fputc(int c,FILE *stream);
        int putc(int c,FILE *stream);
        int putchar(int c);
    putchar : 向标准输出流输出数据.而putc和fputc则是更通用的版本.
    其中putc一般是作为宏来实现,fputc作为函数使用,一般偏好使用putc.

    输入:
        int fgetc(FILE *stream); /*从任意流中读取字符*/
        int getc(FILE　*stream);
        int getchar(void); /*从标准输入流中读取数据*/
        int ungetc(int c,FILE *stream);

2.字符串的输入输出:
    输出:
        /*不会自动添加换行符,当出现错误,均返回EOF*/
        int fputs(const char *s,FILE *stream);
        int puts(const char *s);
    输入:
        /*s:存储的地方,n允许存储的容量*/
        char *fgets(char *s,int n,FILE *stream);
        char *fgets(char *s);
