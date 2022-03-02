##  web worker的介绍和使用

### 概述

`JavaScript` 语言采用的是单线程模型，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。

我们可以通过 `setTimeout()`、`setInterval()`、`ajax` 和事件处理程序等技术模拟“并行”。但都不是真正意义上的并行。

`Web Worker` 的作用，就是为 `JavaScript` 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，`Worker` 线程在后台运行，两者互不干扰。等到 `Worker` 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 `Worker` 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

`Worker` 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 `Worker` 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

### 主线程

主线程采用`new`命令，调用`Worker()`构造函数，新建一个 `Worker` 线程。

```
const worker = new Worker( new URL('./worker.js', import.meta.url),{type:'module'});

```

主线程调用`worker.postMessage()`方法，向 `Worker` 发消息。

`worker.postMessage()`方法的参数，就是主线程传给 `Worker` 的数据。它可以是各种数据类型，包括二进制数据。

```
worker.postMessage("count");

```

主线程通过`worker.onmessage`指定监听函数，接收子线程发回来的消息。

```
worker.onmessage = function (event) {
    console.log(event.data);
    worker.terminate(); //Worker 完成任务以后，主线程就可以把它关掉
};

```

### Worker线程

`Worker` 线程内部需要有一个监听函数，监听`message`事件。

`self.postMessage()`方法用来向主线程发送消息。

```
self.addEventListener('message', (e) => {
    let count = 0;
    for (let i=0;i<10000000000;i++){
        count++;
    }
    self.postMessage(count);//worker线程返回结果
    self.close(); //worker线程关闭
});

```

### 错误处理

主线程可以监听 `Worker` 是否发生错误。如果发生错误，`Worker` 会触发主线程的`error`事件。

```
worker.onerror = function (event) {
    console.log("error");
};

```

### 实例：Worker 线程完成轮询

把轮询工作放在`Worker` 里面，`Worker` 每秒钟轮询一次数据，然后跟缓存做比较。如果不一致，就说明服务端有了新的变化，因此就要通知主线程。
```
if(e.data === "start"){
        let count = 0;
        setInterval(()=>{
            count++;
            if(count % 5 === 0){
                self.postMessage({msg:"interval",count:"5的倍数："+count});
            }
        },1000)
}
```

### Web Worker 限制

#### 1、同源限制

分配给 `Worker` 线程运行的脚本文件，必须与主线程的脚本文件同源。

#### 2、DOM 限制

`Worker` 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 `DOM` 对象，也无法使用`document、window、parent`这些对象。但是，`Worker` 线程可以`navigator`对象和`location`对象。

#### 3、通信联系

`Worker` 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

#### 4、脚本限制

`Worker` 线程不能执行`alert()`方法和`confirm()`方法，但可以使用 `XMLHttpRequest` 对象发出 `AJAX` 请求。

#### 5、文件限制

`Worker` 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。