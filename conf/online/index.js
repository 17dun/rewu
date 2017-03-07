/**
 * @file config.js
 * @desc 线上环境配置
 * @author xiaoguang01
 * @date 2015/9/25
 */
"use strict";
var path = require('path');
module.exports = {
	// 当前运行模式
	runEnv: 'online',

	// 应用全局配置
	app: {
		port: 80
	},

	statics: {
		basePath: 'http://127.0.0.1/client/',
		staticRoute: 'client/build'
	},

	// 文本宏
	consts: {
		siteName: '91热舞'
	},

	// 模板引擎相关配置
	view: {
		root: path.join(__dirname, '../app/template'),
		//layout: 'layout',
        pagedir: 'page',
		viewExt: 'html',
		cache: false,
		debug: true,
		useLess: true
	},

	// 日志相关配置
	log: {
		path: './log/tiancai.log',
		maxLength: 3000,
		level: 1, // [ 1-debug, 2-trace, 3-notice, 4-warn, 5-fatal ]
		printTty: true,
		printFile: true,
		redictConsole: true
	},


    db: 'mongodb://localhost:27017/rewu'
}