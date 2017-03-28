/**
 * @file config.js
 * @desc 开发环境配置
 * @author xiaoguang01
 * @date 2015/9/25
 */
"use strict";
import path from 'path';
export default {
    // 当前运行模式
    runEnv: 'dev',

    // 应用全局配置
    app: {
        port: 8000
    },

    statics: {
        basePath: 'http://127.0.0.1/client/',
        staticRoute: 'client/src'
    },

    // 文本宏
    consts: {
        siteName: '91热舞'
    },

    // 模板引擎相关配置
    view: {
        root: path.join(__dirname, '../../src/template'),
        pagedir: 'page',
        //layout: 'layout',
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


    db: 'mongodb://localhost:27017/rewu',

    channel: [
        {id: 0, title: '头条'},
        {id: 1, title: '推荐'},
        {id: 2, title: '热舞'},
        {id: 3, title: '自拍'},
        {id: 4, title: '聊天'}
    ]
}