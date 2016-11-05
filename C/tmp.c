#include <stdio.h>
#include <stdlib.h>

int  main(int argc,char **argv)
{
	char *filename;
	filename = tmpnam(NULL);	
	printf("the tmp file name is %s\n",*filename);
	return 0;
}
