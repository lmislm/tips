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
	}

	apply(compiler) {
		// console.log('Logger From bundleSize plugin');
		compiler.hooks.done.tap('BundleSizePlugin', stats => {
			const { path, filename } = stats.compilation.options.output;
			const bundlePath = resolve(path, filename)
			const { size } = fs.statSync(bundlePath) // size in bytes
			// console.log(size, '--From plugin size--');
			const { bundleSize, fullSizeInfo } = formatBytes(size)
			console.log(bundleSize, fullSizeInfo, '-----');
		})
	}
}


// code from： https://www.digitalocean.com/community/tutorials/js-create-custom-webpack-plugin