#include <stdlib.h>
struct node{
    int value;
    struct node *next;
};

/**
 *  往链表中添加元素
 */
struct node* add_to_list(struct node* list,int value)
{
    struct node *new_node = malloc(sizeof(struct node));
    if(new_node == NULL){
        exit(EXIT_FAILURE);
    }

    new_node->value = value;
    new_node->next = list;
    return new_node;
}
void add_to_list_1(struct node **list /*指向链表首地址的指针*/,int value)
{
    struct node *new_node;
    new_node = malloc(sizeof(struct node));
    if(new_node == NULL)
        exit(-1);

    new_node->value = value;
    new_node->next = *list;
    *list = new_node;/*此时new_node变为首地址*/
}
struct node *delete_from_list(struct node *list,int value)
{
    struct node *prev;/*被删元素的前一个元素*/
    struct node *cur;/*被删元素*/

    for(cur = list,prev = NULL; cur !=NULL && cur->value != value; prev = cur,cur = cur->next);

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
struct node *search(struct node *list/*此时list只是原始链表的一个地址值，修改它的值不会影响实际的链表*/,int value)
{
    for(;list != NULL && list->value != value ; list = list->next);
    return list;
}




