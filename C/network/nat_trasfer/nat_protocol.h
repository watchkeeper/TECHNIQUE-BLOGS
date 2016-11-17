#define LOGIN 1
#define LOGOUT 2
#define P2PTRANS 3
#define GETALLUSER 4
//服务器端口
#define SERVER_PORT 12345

/*client登陆时向server发送的消息*/
struct login_message
{
    char user_name[40];
    char password[40];
};

/*注销时发送的消息*/
struct logout_message
{
    char user_name[40];
};

/*client向服务器请求另一个client(username)向自己方向发送udp的打洞信息*/
struct p2p_translate_message
{
    char user_name[40];
};

/*client 向服务器发送的信息格式*/
struct c_2_s_msg
{
    int message_type;
    union _message
    {
        login_message login_member;
        logout_message logout_member;
        p2p_translate_message translate_message;
    }message;

}
/*客户节点信息*/
struct user_node
{
    char user_name[40];
    unsigned int ip;
    unsigned short port;
}

struct node {
	user_node user;
	struct node * next;
};
//=========================
/*客户端之间通信*/
//=========================
#define P2PMESSAGE 100 //发送消息
#define P2PMESSAGEACK  101  //收到消息的应答
#define CONNECT_MSG  102 //服务器向客户端发送的消息,希望此客户给对应的用户发送一个打洞数据包.
#define P2P_TRASH 103 //客户端发送的打洞包,接收到应该忽略此消息

//客户端之间发送消息的格式,即向服务端请求后,由服务端代发的消息.
struct c_2_c_msg{
    int message_type;
    int ip_len; /*ip 地址*/
    unsigned short port;
}

/*添加用户到队列中*/
struct node * add_to_list(struct node *list,user_node user);

/*删除用户*/
struct node *delete_from_list(struct node *list,char * user_name);

/*查找用户*/
struct node *search(struct node *list/*此时list只是原始链表的一个地址值，修改它的值不会影响实际的链表*/,char * user_name);

/*获取用户列表大小*/
int size(struct node *user_list);
