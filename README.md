# node-server
这是使用纯 nodejs 搭建的后台服务器，提供简要的API接口以及后台数据的管理系统

快速开始

首先确保你当前服务器上已经搭建好了node环境，并注意是否自己开发时的版本一致

然后 

    git clone https://github.com/Wxiaosheng/node-server.git 

    cd node-server 
    node server.js

这是就起好了当前的 node 服务器，并且可以通过你的工网IP访问，并且得到结果

eg: 这是我的node服务器，可以简单的看下效果
    [http://106.15.201.255:9090/](http://106.15.201.255:9090/)



# 在搭建 node 服务器中遇见的问题

## 1、node 服务器在 localhost 能够访问而工网IP不能访问？
    [请参照]
    netstat -lnp        查看端口占用情况
        Netstat 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。
    常见参数
        -a (all)显示所有选项，默认不显示LISTEN相关
        -t (tcp)仅显示tcp相关选项
        -u (udp)仅显示udp相关选项
        -n 拒绝显示别名，能显示数字的全部转化成数字。
        -l 仅列出有在 Listen (监听) 的服務状态
        -p 显示建立相关链接的程序名
        -r 显示路由信息，路由表
        -e 显示扩展信息，例如uid等
        -s 按各个协议进行统计
        -c 每隔一个固定时间，执行该netstat命令。
        提示：LISTEN和LISTENING的状态只有用-a或者-l才能看到

## 2、当用户断开或者关闭命令行，则对应的脚本也终止了，即此时是无法访问当前的 node 服务器的
    最简单的办法：
        $ nohup node app.js &

    nohup和&后台运行，进程查看及终止
        1.nohup     用途：不挂断地运行命令。
            语法：nohup Command [ Arg … ] [　& ]
            无论是否将 nohup 命令的输出重定向到终端，输出都将附加到当前目录的 nohup.out 文件中。
            如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。
            如果没有文件能创建或打开以用于追加，那么 Command 参数指定的命令不可调用。

        2.&         用途：在后台运行
        一般两个一起用
            nohup command &
        查看运行的后台进程
            （1）jobs -l
                jobs命令只看当前终端生效的，关闭终端后，在另一个终端jobs已经无法看到后台跑得程序了，此时利用ps（进程查看命令）
            （2）ps -ef       ps -aux|grep chat.js
                a:显示所有程序 
                u:以用户为主的格式来显示 
                x:显示所有程序，不以终端机来区分
                用ps -def | grep查找进程很方便，最后一行总是会grep自己
        3.如果某个进程起不来，可能是某个端口被占用
            查看使用某端口的进程  lsof -i:8090    netstat -ap|grep 8090
            查看到进程id之后，使用netstat命令查看其占用的端口   
                netstat -nap|grep 7779
        4.终止后台运行的进程
            kill -9  进程号


    但是，forever能做更多的事情，比如分别记录输出和错误日志，比如可以在js中作为api使用。

        $ sudo npm install forever -g   #安装
        $ forever start app.js          #启动
        $ forever stop app.js           #关闭
        $ forever start -l forever.log -o out.log -e err.log app.js   #输出日志和错误
