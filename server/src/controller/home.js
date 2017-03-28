/**
 * @file food.js
 * @desc 食物控制器
 * @author xiaoguang01
 * @date 2017/3/7
 */
var vdModel = require('../model/home.js');

module.exports = {
    //显示页面
    show: function *(){
        var list = yield vdModel.list(0);
        var top = yield vdModel.getTopList();
        yield this.xrender('home',{
            list: list.data,
            top: top.data
        });
        
    },
    //获取列表
    list: function *(){
        var data = this.query;
        if(data){
            var start = data.start*1;
        }else{
            var start = 0;
        }
        var rs = yield vdModel.list(start);
        yield this.api(rs);
        
    }
};
