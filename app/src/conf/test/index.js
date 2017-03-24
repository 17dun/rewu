/**
 * @file config.js
 * @desc 测试环境配置
 * @author xiaoguang01
 * @date 2015/9/25
 */
var path = require('path');
export default {
	// 当前运行模式
	runEnv: 'test',

	// 应用全局配置
	app: {
		port: 8000
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
		viewExt: 'html',
		cache: false,
		debug: true,
		useLess: false
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

	// 后端连接相关配置
    thirft: {
        host: '123.57.227.107',
        port: 9999,
        timeout: 3000
    },

	// redis连接相关配置
	redis: {
		host: '182.254.209.32',
		port: 6379
	},

    db: 'mongodb://localhost:27017/sousou',

	channel: [
		{id:0,title:'头条'},
		{id:1,title:'推荐'},
		{id:2,title:'热舞'},
		{id:3,title:'自拍'},
		{id:4,title:'聊天'}
	]
}