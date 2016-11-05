#include<stdio.h>
int main(int argc,char *argv)
{

}
size_t my_strlen(const char *s)
{
    const char *p = s;
    while(*s)
        s++;
    return s - p;
}
