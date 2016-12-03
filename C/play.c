/**
 * 发牌游戏。
 * 输入需要牌的数量，然后显示出来。
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define NUM_SUITS 4  /*牌的花色*/
#define NUM_CARD  13  /*每个花色对应牌的数量*/
#define FALSE 0       /*牌是否已经发到手里*/
#define TRUE 1

const char card_code[] = {'2','3','4','5','6','7','8','9','J','Q','K','A','1'};
const char suits_code[] = {'H','S','D','C'}; //扑克牌中红桃（红心）、黑桃、方块（方片）及梅花（草花）分别用英语hearts、spades、diamonds及clubs表示


void print_card(int num_cards,char hand[NUM_SUITS][NUM_CARD]);

int main(int argc, char const *argv[]) {

    int num_cards,peoples;

    for(;;){
        srand((unsigned) time(NULL));

        printf("选择需要扑克牌数量\n" );
        scanf("%d",&num_cards);

        printf("人数\n" );
        scanf("%d",&peoples);
        int i = 0;

        char hand[NUM_SUITS][NUM_CARD] = {FALSE};
        for(;i < peoples;i++){
            printf("A%d手上的牌：",i );
            print_card(num_cards,hand);

        }
        again:
            printf("重新发牌[R] 结束[E] :" );
            setbuf(stdin, NULL); //清除输入缓冲区，避免getchar从printf中取值
            char f = fgetc(stdin);

            switch (f) {
                case 'E':
                    exit(EXIT_SUCCESS);
                case 'R':
                    break;
                default :
                    {
                        while((f = fgetc(stdin)) != '\n' && f != EOF);
                        goto again;
                    }
            }

    }

}

void print_card(int num_cards,char hand[NUM_SUITS][NUM_CARD]){
    int rank,suit;
    while (num_cards > 0) {
        suit = rand() % NUM_SUITS;
        rank = rand() % NUM_CARD;

        if(!hand[suit][rank]){
            hand[suit][rank] = TRUE;
            num_cards--;
            printf(" %c%c", suits_code[suit],card_code[rank]);
        }
    }

    printf("\n" );
}
