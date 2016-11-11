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
struct message
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
