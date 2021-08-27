const pluginName = ConsoleLogOnBuildWebpackPlugin

class ConsoleLogOnBuildWebpackPlugin {
	apply (compiler) {
		// hooks run tap
		// pluginName 驼峰式名称
		// apply 方法会被 webpack compiler 调用，并且在整个编译生命周期都可以访问 compiler 对象。
		compiler.hooks.run.tap(pluginName, compilation => {
			console.log('webpack 构建过程')
		})
	}
}


// class ConsoleLogBuildWebpackPlugin {
// 	apply(compiler) {
// 		compiler.hooks.run.tap(pluginName, compilation => {
// 			console.log('构建开始');
// 		})
// 	}
// }

class TestPlugin {
	apply (compiler) {
		compiler.hooks.run.tap('pluginName', compilation => {

		})
	}
}


// 从上述代码的执行顺序来看，plugin的生命周期如下：

// Compile 开始进入编译环境，开始编译
// Compilation 即将产生第一个版本
// make任务开始
// optimize作为Compilation的回调方法，优化编译，在Compilation回调函数中可以为每一个新的编译绑定回调。
// after-compile编译完成
// emit准备生成文件，开始释放生成的资源，最后一次添加资源到资源集合的机会
// after-emit文件生成之后，编译器释放资源