const { resolve } = require('path')
const Bundlesizeplugin = require('./bundlesize-webpack-plugin')

module.exports = {
	entry: resolve(__dirname, "src/index.js"),
	output: {
		path: resolve(__dirname, 'bin'),
		filename: "bundle.js"
	},
	plugins: [new Bundlesizeplugin()]
}