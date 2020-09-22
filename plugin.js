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