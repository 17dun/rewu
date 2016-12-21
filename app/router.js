/**
 * @file index.js
 * @desc router配置
 * @author xiaoguang01
 * @date 2015/9/25
 */
var router = require('koa-router')();
var ctrs = [];
function getC(app) {
    return new Promise(function (resovel, reject) {
        try {
            ctrs = require('./libs/ctrs.js').getCtrs();
            resovel(ctrs);
        }
        catch (e) {
            reject(e);
        }
    });
}

function set(app) {
    app.use(router.routes());
    getC(app).then(function (ctrs) {
        setMap(ctrs);
    }).catch(function (e) {
        console.log(e);
    });
}

function setMap(ctrs) {
    router.get('/', ctrs.vd.show);
    //食物管理
    router.get('/vd', ctrs.vd.show);
    router.get('/vd/list', ctrs.vd.list);
    router.get('/vd/save', ctrs.vd.save);
    //router.post('/vd/saveList', ctrs.vd.saveList);
    router.get('/vd/del', ctrs.vd.del);
    router.post('/vd/delall', ctrs.vd.delall);
    router.get('/vd/play', ctrs.vd.play);

}
module.exports = set;
