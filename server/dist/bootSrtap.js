'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);





var _conf = require('./conf');var _conf2 = _interopRequireDefault(_conf);

var _template = require('./libs/template');var _template2 = _interopRequireDefault(_template);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var koa = require('koa'); /**
                                                                                                                                                                                                                      * @file bootStrap.js
                                                                                                                                                                                                                      * @desc 程序入口
                                                                                                                                                                                                                      * @author xiaoguang01
                                                                                                                                                                                                                      * @date 2015/9/25
                                                                                                                                                                                                                      */var router = require('./router.js');var route = require('koa-router')();var app = koa();var fs = require('fs');var runEnv = _conf2.default.runEnv;
var bodyParser = require('koa-bodyparser');
var tclog = require('./libs/tclog.js');
var genLogid = require('./libs/logid').genLogid;
var api = require('./libs/api');
var ua = require('./libs/ua');
var gzip = require('koa-gzip');

app.keys = ['tiancai', 'xiaoguang'];
app.use(gzip());

app.use(_regenerator2.default.mark(function _callee(next) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(
                    this.url == '/favicon.ico')) {_context.next = 3;break;}_context.next = 5;break;case 3:_context.next = 5;return (


                        next);case 5:case 'end':return _context.stop();}}}, _callee, this);}));



// 设置模板
(0, _template2.default)(app, _conf2.default.view);

app.context.xrender = ua.renderByUa;
// 设置api
api(app);
app.use(require('koa-static')(_conf2.default.statics.staticRoute));
app.use(bodyParser());
tclog.init();
// live-reload代理中间件
if (runEnv === 'dev') {
    app.use(_regenerator2.default.mark(function _callee2(next) {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                        this.env = 'dev';_context2.next = 3;return (
                            next);case 3:if (!(
                        this.type === 'text/html')) {_context2.next = 7;break;}_context2.next = 6;return (
                            this.toHtml('blocks/reload'));case 6:this.body += _context2.sent;case 7:case 'end':return _context2.stop();}}}, _callee2, this);}));


}




app.use(_regenerator2.default.mark(function _callee3(next) {var logid;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                    logid = genLogid();
                    tclog.notice({ logid: logid, type: 'pv', method: this.req.method, url: this.url, userInfo: this.userInfo });_context3.next = 4;return (
                        next);case 4:case 'end':return _context3.stop();}}}, _callee3, this);}));


// 设置路由
router(app);

app.use(_regenerator2.default.mark(function error(next) {return _regenerator2.default.wrap(function error$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!(
                    this.status === 404)) {_context4.next = 5;break;}_context4.next = 3;return (
                        this.render('error/404', { noWrap: true }));case 3:_context4.next = 7;break;case 5:_context4.next = 7;return (

                        next);case 7:case 'end':return _context4.stop();}}}, error, this);}));



app.listen(_conf2.default.app.port);
tclog.notice('UI Server已经启动：http://127.0.0.1:' + _conf2.default.app.port);
// 启动后通过IO通知watch
if (runEnv === 'dev') {
    fs.writeFile('./pid', new Date().getTime());
}