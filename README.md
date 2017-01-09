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
- 直接替换： `sed 's/\r//g' old > new`


