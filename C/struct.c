#include<stdio.h>
#include<stdlib.h>
struct node {
	int value;
	struct node * next;	
};
struct node * add_to_list(struct node *list,int value);

int main(int argc,char **argv)
{
	struct node *list ;
	list = malloc(sizeof(struct node));
	if(list == NULL)
		exit(-1);

	list = add_to_list(list,11);
	printf("list[%d] = %d\n",0,list->next->value);
	return 0;
}
struct node * add_to_list(struct node *list,int value)
{
	struct node *new_node;
	new_node = malloc(sizeof(struct node));
	new_node ->value = value;
	new_node->next = list->next;

	list->next = new_node;
}
