/**
 * @file food.js
 * @desc 食物控制器
 * @author xiaoguang01
 * @date 2017/3/7
 */
var vdModel = require('../model/vd.js');
module.exports = {

    //显示页面
    show: function *(){
        yield this.render('vd');
        
    },

    play: function *(){
        var data = this.query;
        yield this.render('play',{
            vid: data.vid
        });
    },

    //获取列表
    list: function *(){
        var data = this.query;
        var rs = yield vdModel.list(data);
        yield this.api(rs);
        
    },

    //获取详细信息
    detail: function *(){
        var id = this.query.fid;
        var rs = yield vdModel.detail(id);
        yield this.api(rs);
    },

    //添加食物
    save: function *(){
        var data = this.query;
        var rs = yield vdModel.save(data);
        yield this.api(rs);
    },
    //添加食物
    del: function *(){
        var data = this.query;
        var rs = yield vdModel.del(data);
        yield this.api(rs);
    },
    
    //添加食物
    delall: function *(){
        var data = this.request.body;
        var rs = yield vdModel.delall(data);
        yield this.api(rs);
    }
};
