/*操作用户信息*/

#include<stdio.h>
#include<stdlib.h>
#include "nat_protocol.h"


struct node * add_to_list(struct node *list,user_node user)
{
	struct node *new_node;
	new_node = malloc(sizeof(struct node));
	new_node ->user = user;
	new_node->next = list->next;

	list->next = new_node;
}

struct node *delete_from_list(struct node *list,char * user_name)
{
    struct node *prev;/*被删元素的前一个元素*/
    struct node *cur;/*被删元素*/

    for(cur = list,prev = NULL; cur !=NULL && strcmp( cur->user->user_name , user_name != 0); prev = cur,cur = cur->next);

    if(cur == NULL)
        return list; /*没有找到元素*/
    if(prev == NULL)/*第一个元素满足要求，删掉*/
        list = list->next;
    else
        prev->next = cur->next;
    free(cur);
    return list;
}

/**
 *  搜索满足条件节点
 */
struct node *search(struct node *list/*此时list只是原始链表的一个地址值，修改它的值不会影响实际的链表*/,char* user_name)
{
    for(;list != NULL && strcmp(list->user->user_name,user_name) != 0 ; list = list->next);
    return list;
}
