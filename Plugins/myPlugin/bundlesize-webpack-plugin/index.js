/*
 * @Author: your name
 * @Date: 2020-11-28 16:22:22
 * @LastEditTime: 2021-01-11 09:54:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tips\myPlugin\bundlesize-webpack-plugin\index.js
 */
const fs = require('fs')
const { resolve } = require('path')

function formatBytes (bytes, decimals = 2) {
	if (bytes === 0) return '0 bytes'
	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
	// log 函数
	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return {
		bundleSize: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
		fullSizeInfo: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
	}
}
module.exports = class BundleSizeWebpackPlugin {
	constructor (options) {
		this.options = options || {
			sizeLimit: 10
		}
		this.fileName = options && options.filename ? options.filename : 'FILELIST.md'
	}

	apply(compiler) {
		// AsyncParallelBailHook
		// AsyncParallelHook
		console.log('Logger From bundleSize plugin info 1');
		compiler.hooks.emit.tapAsync('BundleSizeWebpackPlugin', (compilation, cb) => {
			let fileLen = Object.keys(compilation.assets).length;
			let content = `# ${fileLen} file emiited by webpack \n\n`
			// file directory
			console.log(content, 'content--content')
			
			// const { path, filename } = compilation.options.output;
			// const bundlePath = resolve(path, filename)
			// const { size } = fs.statSync(bundlePath)
			// const { bundleSize, fullSizeInfo } = formatBytes(size)
			for (let fileName in compilation.assets) {
				content += `- ${fileName}\n - ${compilation}\n`
			}
			// output
			compilation.assets[this.fileName] = {
				source: function () {
					return content
				},
				size: function() {
					return content.length
				}
			},
			cb() // 执行回调，webpack继续执行
		})
	}
}


// code from： https://www.digitalocean.com/community/tutorials/js-create-custom-webpack-plugin