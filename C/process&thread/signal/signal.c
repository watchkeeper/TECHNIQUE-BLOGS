#include <signal.h>
#include "public_io.h"

signal_func * signal(int signo,signal_func *handler)
{
	struct sigaction act,oact;

	act.sa_handler = handler;

	/*将sa_mask置为空,则在处理函数执行期间,不会阻塞其他信号*/
	sigemptyset(&act.sa_mask);
	act.sa_flags = 0;
	if(signo == SIGALRM){
		#ifdef SA_INTERRUPT
			act.sa_flags |= SA_INTERRUPT;
		#endif
	}else{
		#ifdef SA_RESTART
			act.sa_flags |= SA_RESTART;
		#endif
	}
	if(sigaction(signo,&act,&oact) < 0){
		return (SIG_ERR);
	}
	return oact.sa_handler;
}

/**
 * 处理子进程.
 * @param signo [SIGCHLD]
 */
void sig_child(int signo)
{
	pid_t pid;
	int stat;
	/*wait是阻塞程序,且不一定能处理所有同时发生的多个信号.*/
	pid = wait(&stat);

	return;
}
