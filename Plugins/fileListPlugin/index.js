module.exports = class FileListPlugin {
	constructor(){
		this.filename = 'FileList.md'
	}
	apply(compiler) {
		compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {
			let fileLen = Object.keys(compilation.assets).length
			let content = `# ${fileLen} file emit by webpack plugin\n\n`
			for (let fileName in compilation.assets){
				content += `+ ${fileName}\n`
			}
			// output
			compilation.assets[this.filename] = {
				source: function() { return content },
				size: function() { return content.length }
			},
			cb(),
		})
	}
}