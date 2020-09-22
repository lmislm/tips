Module.prototype.require = function (path) {
	return Module._load(path, this)
}


Module._load = function (request, parent, isMain) {
	// if (parent) {}
	let filename = Module._resolveFilename(request, parent)

	var cachedModule = Module._cache[filename]
	if(cachedModule) {
		return cachedModule.exports;
	}
	
	if (NativeModule.nonInternalExists(filename)) {
		return NativeModule.require(filename)
	}
	var module = new Module(filename, parent)
	if (isMain) { // ？
		ProcessingInstruction.mainModule = module;
		module.id = '.';
	}
	
	Module._cache[filename] = module;
	
	var hadException = true;
	
	try {
		module._load(filename)
		hadException = false;
	} finally {
		if (hadException) {
			delete Module._cache[filename];
		}
	}
	
	return module.exports;
}
// 如果模块在缓存中，返回exports对象
// 如果是原生模块，通过调用NativeModule.require()返回结果
// 否则，创建一个新的模块，保存到缓存中
NativeModule.require = function (id) {
	if (id == 'native_module') {
		return NativeModule;
	}

	var cached = NativeModule.getCached(id);
	if (cached) {
		return cached.exports;
	}

	if (!NativeModule.exists(id)) {
		throw new Error('No such native module' + id)
	}

	process.moduleLoadList.push('NativeModule' + id);

	var nativeModule = new NativeModule(id);

	nativeModule.cache();
	nativeModule.compile();

	return nativeModule.exports;
}
// 缓存策略
// 创建NativeModule对象

// compile方法
NativeModule.prototype.wrap = function (script) {
	return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
}
NativeModule.prototype.getSource = function (id) {
	return NativeModule._source[id];
}
NativeModule.prototype.compile = function () {
	var source = NativeModule.getSource(this.id);
	source = NativeModule.wrap(source);
	// wrap将http.js包裹
	var fn = runInThisContext(source, {
		filename: this.filename,
		lineOffset: 0
	})
	fn(this.exports, NativeModule.require, this, this.filename)

	this.loaded = true;
}

// runInThisContext
var ContextifyScript = process.binding('contextify').ContextifyScript;
function runInThisContext(code, options) {
	var script = new ContextifyScript(code, options)
	return script.runInThisContext();
}

// https://github.com/yjhjstz/deep-into-node/blob/master/chapter2/chapter2-2.md

// Node.js 通过 cache 解决无限循环引用的问题, 也是系统优化的重要手段，通过以空间换时间，使得每次加载模块变得非常高效。

// 在实际的业务开发中，我们从堆的角度观察 node 启动模块后，缓存了大量的模块，包括第三方的模块，有的可能只加载使用一次。笔者觉得有必要有一种模块的卸载机制 [1], 可以降低对 V8 堆内存的占用，从而提升后续垃圾回收的效率。