#include <stdio.h>
#include <stdlib.h>

/*小端和大端的验证*/

int main(int argc,char **argv)
{
	union{
		short s;
		char c[sizeof(short)];
	}un;

	un.s = 0x0109;
	
	if(sizeof(short) == 2){
		if(un.c[0] == 1 && un.c[1] == 9)
			printf("big-endian\n");
		else if(un.c[0] == 9 && un.c[1] == 1)
			printf("little-endian\n");
		else
			printf("unkown..\n");
	}else{
		printf("sizeof(short) = %d\n", sizeof(short));
	}
	exit(0);
}
