/**
 * @file bootStrap.js
 * @desc 程序入口
 * @author xiaoguang01
 * @date 2015/9/25
 */
import config from './conf';
const Koa = require('koa');
const app = new Koa();
import view from './libs/template';
var router = require('./router.js');
var route = require('koa-router')();
var fs = require('fs');
var runEnv = config.runEnv;
var bodyParser = require('koa-bodyparser');
var tclog = require('./libs/tclog.js');
var genLogid = require('./libs/logid').genLogid;
var api = require('./libs/api');
var ua = require('./libs/ua');
var gzip = require('koa-gzip');
const convert = require('koa-convert');


const session = require('koa-session');
app.keys = ['xiaoguangrewu'];
app.use(convert(session({}, app)));

app.use(convert(gzip()));

app.use(function *(next) {
    if(this.url == '/favicon.ico'){
        //favicon return
    }else{
        yield next;
    }
})

// 设置模板
view(app, config.view);

app.context.xrender = ua.renderByUa;
// 设置api
api(app);
app.use(convert(require('koa-static')(config.statics.staticRoute)));
app.use(convert(bodyParser()));
tclog.init();
// live-reload代理中间件
if (runEnv === 'dev') {
    app.use(function *(next) {
        this.env = 'dev';
        yield next;
        if(this.type === 'text/html') {
            this.body += yield this.toHtml('blocks/reload');
        }
    });
}




app.use(function *(next) {
    var logid = genLogid();    
    tclog.notice({logid:logid,type:'pv',method:this.req.method,url:this.url,userInfo:this.userInfo})
    yield next;
});

// 设置路由
router(app);

app.use(function *error(next) {
    if (this.status === 404) {
        yield this.render('error/404',{noWrap:true});
    }else{
        yield next;
    }
});

app.listen(config.app.port);
tclog.notice('UI Server已经启动：http://127.0.0.1:'+config.app.port);
// 启动后通过IO通知watch
if (runEnv === 'dev') {
    fs.writeFile('./pid', new Date().getTime());
}