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
        yield this.xrender('home');
        
    },
    //获取列表
    list: function *(){
        var data = this.query;
        var rs = yield vdModel.list(data);
        yield this.api(rs);
        
    }
};
