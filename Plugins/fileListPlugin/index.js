
function FirstPlugin (options) {}
FirstPlugin.prototype.apply = (compiler) {
	compiler.plugin = ('emit', (compilation, callback) => {
		let fileList = 'In'
		for (let filename in compilation.assets) {
			fileList += ('_ ' + filename + '\n')
		}
		compilation.assets['fileList.md'] = {
			source: () => {
				return fileList
			}
			size: () => {
				return fileList.length
			}
		}
		callback()
	})
}

module.exports = FirstPlugin