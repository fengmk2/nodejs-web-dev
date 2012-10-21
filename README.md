# Nodejs 快速开发Web产品

---

## Who am I?我是谁？

### Alibaba Data EDP
### 阿里巴巴数据平台EDP，花名@苏千
### Chinese nodejs community: [cnodejs.org](http://cnodejs.org)

<hr/>

### Github: @[fengmk2](https://github.com/fengmk2/)
### Blog: http://fengmk2.github.com
### Twitter: @fengmk2
### Weibo: @Python发烧友 , @FaWave

---

# 什么是Web开发

---

## Web开发

* HTTP
* Request
* Response
* Cookie
* Session
* URL routing
* Template Engine
* DataBase

---

# Why Nodejs?

---

## IO密集型

### * 磁盘IO：读写文件
### * 网络IO：数据库，Cache，Services
### * 进程：进程通信，进程调用

---

## Nodejs的核心关键词

![about nodejs](http://nfs.nodeblog.org/a/e/ae78a26d6c26b7ab755f1c34da778196.png)

### * V8
### * Event driven
### * Non-blocking IO

---

## V8有多快？

![fibonacci](http://nfs.nodeblog.org/e/c/eca1b2026c120772533318553454c7c6.png)

* [fibonacci(40) benchmark](http://fengmk2.github.com/blog/2011/fibonacci/nodejs-python-php-ruby-lua.html)

---

## 高楼从地起: Hello World

[helloworld.js](https://github.com/fengmk2/nodejs-web-dev/blob/master/helloworld.js)
```js
var http = require('http');
http.createServer(function (req, res) {
  console.log('%s %s : %j', req.method, req.url, req.headers);
  req.on('end', function () {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.end('Hello Alibaba.');
  });
}).listen(1984);
```

<hr/>

### Event driven: req.`on`(`'end'`, function () {})

---

## 看看得到什么

![hello world result](http://ww1.sinaimg.cn/large/6cfc7910jw1dy32hus4ipj.jpg)

---

## console.log()

```bash
$ node helloworld.js 

GET / : {"host":"localhost.cnodejs.org:1984","connection":"keep-alive","cache-control":"max-age=0","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","accept-encoding":"gzip,deflate,sdch","accept-language":"zh-CN,zh;q=0.8,en;q=0.6,en-US;q=0.4","accept-charset":"GBK,utf-8;q=0.7,*;q=0.3"}

GET /favicon.ico : {"host":"localhost.cnodejs.org:1984","connection":"keep-alive","accept":"*/*","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4","accept-encoding":"gzip,deflate,sdch","accept-language":"zh-CN,zh;q=0.8,en;q=0.6,en-US;q=0.4","accept-charset":"GBK,utf-8;q=0.7,*;q=0.3"}
```

---

# 说笑吧，太简单了吧

---

## Simple todo

使用 `Mongodb` 存储，快速实现最简单的两个功能:

### * 添加任务
### * 显示任务
### * 完成任务

---

## 目录结构

```
|- app.js
|- config.js
|- routes.js
|- package.json
|- views/
 |- layout.html
 |- index.html
 |- error.html
 |- task/
  |- edit.html
|- public/
 |- images/
 |- styles/
|- controllers/
 |- home.js
 |- task.js
|- models/
 |- db.js
 |- task.js
|- node_modules/
```

---

## package.json

### 使用npm init 生成项目的 package.json

```bash
$ npm init
```

## 使用强大的第三方模块加速开发效率

### 依赖模块:

```json
  "dependencies": {
    "connect": "2.6.0", // web server, static files hosting
    "urlrouter": "0.2.3", // url routing
    "connect-render": "0.1.7", // ejs template engine helper
    "mongoskin": "0.4.4" // mongodb client
  }
```

---

## 主页面效果

### HTML + CSS，服务器端使用 [ejs] 模板引擎渲染

![index page](http://ww4.sinaimg.cn/large/6cfc7910jw1dy3aj29sgyj.jpg)

---

## 主页面 URL Routing

### URL路由简单明了

```js
var home = require('./controllers/home');
// HTTP GET / => home controller
app.get('/', home);
```

---

## Home Controller

```js
module.exports = function home(req, res, next) {
  res.render('index.html', {
    tasks: [] // 稍后会增加数据库逻辑
  });
};
```

---

## 静态文件服务

### 直接使用 [connect] 的 static 中间件模块

```js
app.use('/public', 
  connect.static(path.join(__dirname, 'public')));
```

---

## 添加任务

### URL路由配置

```js
var task = require('./controllers/task');

app.post('/task', task.add);
```

### HTML模板及CSRF保护

```html
  <div class="box post">
    <h2>新增</h2>
    <form action="/task" method="post" id="post_new">
      <input type="hidden" name="_csrf" value="<%- _csrf %>" />
      <p><input type="text" name="title" class="long_txt" /></p>
      <p><input type="submit" class="submit" value="添加" /></p>
    </form>
  </div>
```

---

## 任务 controller 实现代码

```js
var Task = require('../models').Task;

exports.add = function (req, res, next) {
  var title = req.body.title;
  var task = {
    title: title, 
    finished: 0, 
    created_at: new Date()
  };
  Task.insert(task, function (err, item) {
    if (err) {
      return next(err);
    }
    res.writeHeader(302, {
      Location: '/'
    });
    res.end();
  });
};
```

---

## 在主页面上显示刚才提交的任务

```js
var Task = require('../models').Task;

module.exports = function home(req, res, next) {
  // 按未完成的排前面，然后再按时间倒序显示
  var options = { 
    sort: [ [ 'finished', 'asc' ], [ '_id', 'desc' ] ] 
  };
  Task.findItems({}, options, function (err, tasks) {
    if (err) {
      return next(err);
    }
    res.render('index.html', {
      tasks: tasks
    });
  });
};
```

---

## 完成任务

```js
app.get('/task/(:id)/finish', task.finish);
```

### controller 实现代码

```js
exports.finish = function (req, res, next) {
  var tid = req.params.id;
  var task = { finished: 1, updated_at: new Date() };
  Task.updateById(tid, { $set: task }, function (err, item) {
    if (err) {
      return next(err);
    }
    res.writeHeader(302, {
      Location: '/'
    });
    res.end();
  });
};
```

---

## 整体效果

![todo2](http://ww3.sinaimg.cn/large/6cfc7910jw1dy3cyzeczlj.jpg)

---

## Talk is cheap

### 删除任务，编辑任务，用户系统...，剩余的功能，等你来完成。

## “自己动手，丰衣足食”

### fork [this project](https://github.com/fengmk2/nodejs-web-dev), then do it.

---

# 应用展示

---

## 淘宝指数

![shu](http://ww1.sinaimg.cn/large/6cfc7910jw1dy3d4ac0kpj.jpg)

---

## 数据魔方

![mofang](http://ww1.sinaimg.cn/large/6cfc7910jw1dy3d6a73rfj.jpg)

---

## 内部NPM Web

---

## CNodejs 社区

![cnode](http://ww3.sinaimg.cn/large/6cfc7910jw1dy3d9uzu1yj.jpg)

---

[http://fengmk2.github.com/ppt/nodejs-web-dev.html](http://fengmk2.github.com/ppt/nodejs-web-dev.html)

# web.emit(`'Thanks'`) <br/>&&<br/> console.log(`'end'`);


 [connect]: https://github.com/senchalabs/connect
 [ejs]: https://github.com/visionmedia/ejs
