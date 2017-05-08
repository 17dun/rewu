const Koa = require('koa');
const app = new Koa();
const path = require('path');
const view = require('./src/libs/template');
const router = require('koa-router')();
const convert = require('koa-convert');
app.use(convert(router.routes()));

view(app, {
    root: path.join(__dirname, './template'),
    pagedir: 'page',
    viewExt: 'html',
    cache: false,
    debug: true,
    useLess: true
    }
);

router.get('/', function *(){
	console.log('进入首页');
    yield this.render('home',{}); 
 });



app.listen(8000);
console.log('已经启动');
