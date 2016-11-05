#include<stdio.h>
int main(int argc,char **argv)
{
	int a[10] = {1,2,3,4,5,6,7,8,9,10};
	printf("a[0] = %d\n",a[0]);
	printf("0[a] = %d\n",0[a]);
	int i = 0;
	while( i < argc){
		printf("arg = %s\n",argv[i++]);
	}
}
