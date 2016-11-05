#include <stdio.h>
#include <stdlib.h>
int main(int argc,char **argv)
{
	if(argc !=2 ){
		printf("usage file name");
		exit(EXIT_FAILURE);
	}		
	FILE *file;
	if((file = fopen(argv[1] ,"rb")) == NULL){
		printf("can't opened file %s\n",argv[1]);
		exit(EXIT_FAILURE);
	}
	printf("can opened %s\n",argv[1]);
	fclose(file);
	return 0;
}
