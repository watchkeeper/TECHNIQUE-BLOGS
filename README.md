# TECHNIQUE-BLOGS
Ronnie and Modle daily technique-blog<br><br><br>
得到**ssh** 公钥密纹 ` ssh-keygen -lf ....authorized_keys(id_rsa.pub)`

#CRON  
`crontab` 默认使用的是`/bin/sh`，路径`PATH`默认是`/usr/bin:/bin`，所以在编写定时任务时，需要手动设置对应的`shell`以及`PATH`的值；当然也可以直接在定时任务中引入用户的环境变量。

```shell
* * * * * . /etc/profile;/bin/bash command
```

#dos unix中的换行符问题
在`windows`下编辑后的文件上传到`unix`系统上，可以会出现`^M`（`ctrl + v + M`）符号，导致异常，出现该现象是由于`windows`下换行符是`\r\n`，而`unix`下换行符则是`\n`，多出了一个，解决办法将其替换掉即可：

- 使用`dos2unix`工具
- 在vim编辑器下进行设置：  `set fileformat=unix` 或 `set ff=unix`
- 直接替换： `sed -i 's/\r//g' old `，直接在源文件进行替换

# fiddle原理及其在打开时候web无法访问的问题  
- 原理:  
&emsp;&emsp;所有客户端请求和所有服务器请求都经过**fiddle**之后再彼此通信，所以可以`get request`，用于扣限制页面极其方便。

- resolve:     
&emsp;&emsp;出现那个问题是由于**fiddle**默认占用**8888**端口，本地由此端口，就会不行，杀死端口即可。

# 各路英雄  

[ibm社区](http://www.ibm.com/developerworks/cn/)<br>
[美团技术](http://tech.meituan.com)<br>
[C++](http://www.cppblog.com)<br>
[大牛博客](https://www.byvoid.com)<br>
[机器学习](http://freemind.pluskid.org)<br>
[http://www.yinwang.org](http://www.yinwang.org)<br>
[浪人……](http://www.hankcs.com)<br>
[注重底层](https://ring0.me)<br>
[Java](http://colobu.com)<br>
[奇虎360科技博客](http://blogs.360.cn)  <br>
[练兵场](https://leetcode.com/problemset/algorithms/)
