// todo: 
// 1. formData
// loader 是文件转换，比如less loader,将less转为css
// plugin 是扩展，针对的是loader结束之后，webpack的整个打包过程，监听打包过程的某些节点
// 2. URL hash和history模式
// display: flex; flex: 1;


// 观察者模式和发布订阅模式的区别

// async await 的实现

// 1. Subject -- Observer(Observer pattern)
// ╭─────────────╮  Fire Event  ╭──────────────╮
// │             │─────────────>│              │
// │   Subject   │              │   Observer   │
// │             │<─────────────│              │
// ╰─────────────╯  Subscribe   ╰──────────────╯

// Subject --Fire Event--> Observer
// Subject <--Subscribe-- Observer

// 2. Publisher -- Event Channel -- Subscriber(Pub-sub pattern)
// ╭─────────────╮                 ╭───────────────╮   Fire Event   ╭──────────────╮
// │             │  Publish Event  │               │───────────────>│              │
// │  Publisher  │────────────────>│ Event Channel │                │  Subscriber  │
// │             │                 │               │<───────────────│              │
// ╰─────────────╯                 ╰───────────────╯    Subscribe   ╰──────────────╯
// 1. 数据打包

// ---------观察者模式-----------------
// 定义一个 DownloadTask 类作为观察者
function DownloadTask(id) {
  this.id = id;
  this.loaded = false;
  this.url = null;
}

DownloadTask.prototype.finish = function(url) {
  this.loaded = true;
  this.url = url;
  console.log('Task ' + this.id + ' load data from ' + url);
}
// 再定义一个 DownloadTaskList 类放便管理多个下载任务
function DownloadTaskList() {
  this.downloadTaskList = [];
}

DownloadTaskList.prototype.getCount = function() {
  return this.downloadTaskList.length;
};

DownloadTaskList.prototype.get = function(index) {
  return this.downloadTaskList[index];
};

DownloadTaskList.prototype.add = function(obj) {
  return this.downloadTaskList.push(obj);
};

DownloadTaskList.prototype.remove = function(obj) {
  const downloadTaskCount = this.downloadTasks.getCount();
  while (i < downloadTaskCount) {
    if (this.downloadTaskList[i] === obj) {
      this.downloadTaskList.splice(i, 1);
      break;
    }
    i++;
  }
};


// 定义一个 DataHub 作为被观察目标
function DataHub() {
  this.downloadTasks = new DownloadTaskList();
}

DataHub.prototype.addDownloadTask = function(downloadTask) {
  this.downloadTasks.add(downloadTask);
};

DataHub.prototype.removeDownloadTask = function(downloadTask) {
  this.downloadTasks.remove(downloadTask);
};

DataHub.prototype.notify = function(url) {
  const downloadTaskCount = this.downloadTasks.getCount();
  for (var i = 0; i < downloadTaskCount; i++) {
    this.downloadTasks.get(i).finish(url);
  }
};

// 创建一个数据中心
var dataHub = new DataHub();
// 现在用户来取数据了，创建两个任务
var downloadTask1 = new DownloadTask(1);
var downloadTask2 = new DownloadTask(2);

dataHub.addDownloadTask(downloadTask1);
dataHub.addDownloadTask(downloadTask2);
// 数据打包完成了
dataHub.notify('http://somedomain.someaddress');


// --------发布-订阅------------

// 定义 DataHub 类作为发布者function DataHub() {}

DataHub.prototype.notify = function(url, callback) {
  callback(url);
}
// 定义 DownloadManager 类作为事件通道
function DownloadManager() {
  this.events = {};
  this.uId = -1;
}

DownloadManager.prototype.publish = function(eventType, url) {
  if (!this.events[eventType]) {
    return false;
  }
  var subscribers = this.events[eventType],
    count = subscribers ? subscribers.length : 0;
  while (count--) {
    var subscriber = subscribers[count];
    subscriber.handler(eventType, subscriber.taskId, url);
  }
}

DownloadManager.prototype.subscribe = function(eventType, handler) {
  if (!this.events[eventType]) {
    this.events[eventType] = [];
  }
  var taskId = (++this.uId).toString();
  this.events[eventType].push({
    taskId: taskId,
    handler: handler
  });

  return taskId;
}
// 创建一个数据中心
var dataHub = new DataHub();
// 创建一个下载事件管理器
var downloadManager = new DownloadManager();
// 创建一个下载器
var dataLoader = function(eventType, taskId, url) {
  console.log('Task ' + taskId + ' load data from ' + url);
}
// 用户来请求数据了
var downloadTask1 = downloadManager.subscribe('dataReady', dataLoader);
// 数据打包完成了
dataHub.notify('http://somedomain.someaddress', function(url){
  downloadManager.publish('dataReady', url);
});

