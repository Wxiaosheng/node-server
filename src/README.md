# node 的 常用模块

## 文件操作模块：
    fs 模块：
        一组类似 UNIX（POSIX）标准的文件操作API。
        异步和同步
            文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
        打开文件
            fs.open(path, flags[, mode], callback)
                path - 文件的路径。
                flags - 文件打开的行为。具体值详见下文。
                mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
                callback - 回调函数，带有两个参数如：callback(err, fd)。
        获取文件信息
            fs.stat(path, callback)
                path - 文件路径。
                callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。

## events 模块：
        // 1、引入 events 模块
        var events = require('events');
        // 2、创建 eventEmitter 对象
        var eventEmitter = new events.EventEmitter();
        // 3、绑定事件及事件的处理程序
        eventEmitter.on('eventName', eventHandler);
        // 4、我们可以通过程序触发事件
        eventEmitter.emit('eventName');

    events 模块只提供了一个对象： events.EventEmitter。
    EventEmitter 的核心就是事件触发与事件监听器功能的封装。

    方法：
        addListener(event, listener)    为指定事件添加一个监听器到监听器数组的尾部。
        on(event, listener)     为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
        once(event, listener)   为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
        removeListener(event, listener)     移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
        removeAllListeners([event])     移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
        setMaxListeners(n)      默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。
        listeners(event)    返回指定事件的监听器数组。
        emit(event, [arg1], [arg2], [...])  按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。
    类方法：
        listenerCount(emitter, event)   返回指定事件的监听器数量。

## Buffer(缓冲区)
    JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
    但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
    1、Buffer 与字符编码
        Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。
    2、创建 Buffer 类
        分配一个新的 size 大小单位为8位字节的 buffer。 使用 alloc or allocUnsafe 方法
            Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
        拷贝参数 buffer 的数据到 Buffer 实例，分配一个新的 buffer ，其中包含着传入的 str 字符串。 使用 from 方法
            Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例
    3、写入缓冲区
        buf.write(string[, offset[, length]][, encoding])
            string - 写入缓冲区的字符串
            offset - 缓冲区开始写入的索引值，默认为 0 
            length - 写入的字节数，默认为 buffer.length
            encoding - 使用的编码。默认为 'utf8' 
        返回值：返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
    4、从缓冲区读取数据
        buf.toString([encoding[, start[, end]]])
            encoding - 使用的编码。默认为 'utf8' 
            start - 指定开始读取的索引位置，默认为 0
            end - 结束位置，默认为缓冲区的末尾
        返回值：解码缓冲区数据并使用指定的编码返回字符串
    5、将 Buffer 转换为 JSON 对象
        buf.toJSON()
        返回值：返回 JSON 对象。
        当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
        所以 可以直接调用 const json = JSON.stringify(buf)
    6、缓冲区合并
        Buffer.concat(list[, totalLength])
            list - 用于合并的 Buffer 对象数组列表。
            totalLength - 指定合并后Buffer对象的总长度。
            返回值：返回一个多个成员合并的新 Buffer 对象
    7、缓冲区比较
        buf.compare(otherBuffer);
            otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
        返回值：返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同（小于0，等于0，大于0）
        buf.equals(otherBuffer)
        比较两个缓冲区是否相等，如果是返回 true，否则返回 false。
    8、拷贝缓冲区
        buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
            targetBuffer - 要拷贝的 Buffer 对象。
            targetStart - 数字, 可选, 默认: 0
            sourceStart - 数字, 可选, 默认: 0
            sourceEnd - 数字, 可选, 默认: buffer.length
        返回值：没有返回值。
    9、缓冲区裁剪
        buf.slice([start[, end]])
            start - 数字, 可选, 默认: 0
            end - 数字, 可选, 默认: buffer.length
        返回值：返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
    10、缓冲区长度
        buf.length;
        返回值：返回 Buffer 对象所占据的内存长度。

## Stream(流)
    Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。
    Node.js，Stream 有四种流类型：
        Readable - 可读操作。
        Writable - 可写操作。
        Duplex - 可读可写操作.
        Transform - 操作被写入数据，然后读出结果。
    所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有:
        data - 当有数据可读时触发。
        end - 没有更多的数据可读时触发。
        error - 在接收和写入过程中发生错误时触发。
        finish - 所有数据已被写入到底层系统时触发。
    // 创建一个可读流
        var readerStream = fs.createReadStream('input.txt');
    // 创建一个可写流
        var writerStream = fs.createWriteStream('output.txt');
    // 管道读写操作
    // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
        readerStream.pipe(writerStream);

## 模块系统
    模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。
    换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

    ![nodejs-require](https://github.com/Wxiaosheng/node-server/blob/master/src/images/nodejs-require.jpg)

## 路由
    我们要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码。

## 全局变量
    JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。
    __filename 表示当前正在执行的脚本的文件名。
    __dirname 表示当前执行脚本所在的目录。
    setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。
        返回一个代表定时器的句柄值。
    clearTimeout( t ) 全局函数用于停止一个之前通过 setTimeout() 创建的定时器。 
    setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
        返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
    console 用于提供控制台标准输出:

    process 它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
        ...

## 常用工具
    util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。
    util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。
    util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。
        showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
        depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。
        如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
    util.isArray(object)如果给定的参数 "object" 是一个数组返回true，否则返回false。
    util.isRegExp(object)如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
    util.isDate(object)如果给定的参数 "object" 是一个日期返回true，否则返回false。
    util.isError(object)如果给定的参数 "object" 是一个错误对象返回true，否则返回false。


## 第三方模块
    mysql 模块：
        连接数据库
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '123456',
                database : 'test'
            });
        不能连接到远程服务器上的数据库解决办法？（ER_HOST_NOT_PRIVILEGED）
            ER_HOST_NOT_PRIVILEGED 表示 不允许将主机'%s'连接到该MySQL服务器。没有相应的权限
            解决办法：
                GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'xs993436' WITH GRANT OPTION;
                FLUSH PRIVILEGES;
                