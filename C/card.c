#include <stdio.h>
#include <time.h>
#include <ctype.h>
#include <stdlib.h>
#include <sys/types.h>

#define CARDSNUM 52                                     /* 牌数 */
#define NUMXIPAI 1                                       /* 洗牌次数 */
#define CARDS cards                                      /* 扑克数组 */
#define CARDS_F  int CARDS[CARDSNUM]                     /* 扑克数组定义及函数参数 */


/* 洗牌函数声明 */
void InitCards(CARDS_F);
void ShuffleArray_Fisher_Yates(CARDS_F);
void PrintCards(CARDS_F);
void Puke(CARDS_F);


int main(int argc,char *argv[])
{
     unsigned int ch=0; while(ch<=255) {  printf("%d\t%c\n",ch,ch);  ch++; }
	// time_t t;
	// CARDS_F;
    //
	// srand(time(&t));
    //
	// Puke(CARDS);
	// PrintCards(CARDS);



	return 0;
}

void InitCards(CARDS_F)       /*码牌   扑克数组初始化 */
{
	int i;
	for(i = 0; i < CARDSNUM; i++)
	{
		CARDS[i] = i+1;
	}
}

void ShuffleArray_Fisher_Yates(CARDS_F)    /* Fisher_Yates算法 */
{
	int i, j, k;

	for(i = CARDSNUM; i > 0; i--)
	{

		j = (rand()%(i));
		k = CARDS[i-1];
		CARDS[i-1] = CARDS[j];
		CARDS[j] = k;
	}
}

void PrintCards(CARDS_F)   /* 输出牌 */
{
	int j;

	printf("\nYour Cards Is: ");
	for(j = 0; j < CARDSNUM; j++)
	{
		if(!(j%10))
		{
			printf("\n");
		}
		printf("%d  ", CARDS[j]);
	}
}



void Puke(CARDS_F)      /* 洗牌 */
{
	int i;

	InitCards(CARDS);

	for(i = 1; i <= NUMXIPAI; i++)
	{
		ShuffleArray_Fisher_Yates(CARDS);
	}


}
