#include <stdio.h>
#include <stdlib.h>

/**
 * 判断是否可以读取文件
 */
int main(int argc,char **argv)
{
    printf("argv[0] = %s\targv[1] = %s\n",argv[0],argv[1]);
    FILE *fp;
    if(argc != 2){
        printf("usage : canopen filename\n");
        exit(EXIT_FAILURE);
    }

    if((fp = fopen(argv[1],"br")) == NULL){
        printf("%p\n",fp);
        printf("%s can't be opened\n",argv[1]);
        exit(EXIT_FAILURE);
    }

    printf("%s can be opened\n",argv[1]);
    fclose(fp);
    return 0;
}
