// chunk plugin
function ChunkPlugin (options) {}
ChunkPlugin.prototype.apply = function (compiler) {
	compiler.plugin('emit', (compilation, callback) => {
			compilation.chunks.forEach(chunk => {
				// 检索模块中包含每个源文件的路径
				chunk.modules.forEach(module => {
					module.fileDependencies.forEach((filePath) => {
						// 处理相爱难改观
					})
				})
				chunk.files.forEach((filename) => {
					let source = compilation.assets[filename].source()
				})
			})
			callback()
	})
}

module.exports = ChunkPlugin


function ChangedChunkPlugin () {
	this.chunkVersions = {}
}
ChangedChunkPlugin.prototype.apply = (compiler) => {
	compiler.plugin('emit', (compilation, callback) => {
		var changedChunks = compilation.chunks.filter(chunk => {
			var oldVersion = this.chunkVersions[chunk.name]
			this.chunkVersions[chunk.name] = chunk.hash
			return chunk.hash !== oldVersion;
		}.bind(this))
		callback()
	}.bind(this))
}
module.exports = ChangedChunkPlugin


