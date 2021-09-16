/**
 * ## compiler 相关
 * done 一次编译完成后
 * make 一次编译完成之前
 * emit 生成文件到output目录之前执行 发生emit事件时所有模块的转换和代码块对应的文件已经生成好
 * afterEmit 之后
 * Compile 在一个新的compilation创建之前
 * compilation 再一次compilation创建之后
 * ## compilation 相关
 * - Compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息
 * - 构建模块和 Chunk，并利用插件优化构建过程
 * buildModule 模块开始编译之前触发，用于修改模块
 * seal 一次compilation停止接收新模块时触发
 * 
 * apply 函数中需要有通过 compiler 对象挂载的 webpack 事件钩子，
 * 钩子的回调中能拿到当前编译的 compilation 对象，如果是异步编译插件的话可以拿到回调 callback
 * 
  - plugin的生命周期如下：
  Compile 开始进入编译环境，开始编译
  Compilation 即将产生第一个版本
  make 任务开始
  optimize 作为Compilation的回调方法，优化编译，在Compilation回调函数中可以为每一个新的编译绑定回调。
  after-compile 编译完成
  emit 准备生成文件，开始释放生成的资源，最后一次添加资源到资源集合的机会
  after-emit 文件生成之后，编译器释放资源

  - 打包流程：
  读取配置文件
  compiler解析项目
  entry开始解析
  loader编译
  webpack整个过程中会，发布订阅

  HMR 热更新原理
  chunk diff

  webpack 构建流程
  entry-option
 */
/**
 * webpack 构建流程分析
 * - 初始化
 * entry-option
 * run 开始编译
 * - 编译构建
 * entry
 * make 分析依赖
 * before-resolve 模块位置解析
 * build-module 构建模块
 * normal-module-loader loader的module编译，生成AST
 * program 遍历AST，收集依赖
 * seal 所有依赖build完成
 * emit 输出到dist目录
 */
// 1
compiler.plugin("compile", function (params) {
  console.log("The compile is starting to compile...", params);
});
// 2
compiler.plugin("compilation", function (compilation, params) {
  console.log("The compile is starting a new compilation...");
});
// 3
compiler.plugin("make", function (compiler, callback) {
  console.log("the compile is making file...");
  callback();
});
// 4
compilation.plugin("optimize", function () {
  console.log("The compilation is starting to optimize file...");
});
// 5
compiler.plugin("after-compile", function (compilation) {
  console.log("The compile has aleardy compiled");
});
// 6
compiler.plugin("emit", function (compilation, callback) {
  console.log("The compilation is going to emit files...");
  callback();
});
// 7
compiler.plugin("after-emit", function (compilation) {
  console.log("The compliation has aleardy emitted");
});
