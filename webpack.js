/**
 * 父子应用之间通信
 * 1. 发布订阅式通信，initGlobalState
 * 2. 单向数据流，基于props传参的模式
 */
/**
 * Taptable hook
 * Sync
 *  SyncHook
 *  SyncBailHook
 *  SyncWaterfallHook
 *  SyncLoopHook
 * Async
 *  AsyncParallelHook
 *  AsyncParallelBailHook
 *  AsyncSeriesHook
 *  AsyncSeriesBailHook
 *  AsyncWaterfallHook
 *  AsyncSeriesLoopHook
 */
 const factory = new SyncHookCodeFactory()
 class SyncHook extends Hook {
	 compile(options) {
		 factory.setup(this, options)
		 return factory.create(options)
	 }
 }
 
 /**
	* 初始化参数
	* 开始编译
	* 确定入口
	* 编译模块
	* 完成编译
	* 输出资源
	*/