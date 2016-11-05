#include<stdio.h>
int read_line(char str[],int len);
int main(int argc,char *argv)
{
    puts("this is puts print");
    char str[11];
    read_line(str,10);
    puts(str);
    return 0;
}
int read_line(char str[],int len)
{
    int ch,i = 0;
    while((ch = getchar()) != '\n'){
        if(i < len)
            str[i++] = ch;

    }
    str[i] = '\0';
    return i;
}
