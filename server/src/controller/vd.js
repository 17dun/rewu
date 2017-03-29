/**
 * @file food.js
 * @desc 食物控制器
 * @author xiaoguang01
 * @date 2017/3/7
 */
var vdModel = require('../model/vd.js');
import conf from '../conf';
const channelList =  conf.channel;

module.exports = {

    //显示页面
    show: function *(){
        var users = yield vdModel.getUsers();
        var importTimes = yield vdModel.getImportTimes();
        yield this.render('vd',{
            channelList: channelList,
            users: users,
            importTimes: importTimes
        });
        
    },

    //显示搜索页
    showSearch: function *(){
        var word = this.query.word;
        if(word){
            var list = yield vdModel.getSearchList(word);
        }else{
            var list = {data:[]};
        }
        yield this.xrender('search',{
            list: list.data,
            word: word
        });
    },

    play: function *(){
        var data = this.query;
        yield this.xrender('play', {
            vid: data.vid,
            num: data.num,
            target: data.target,
            user: data.user,
            time: data.time
        })
    },


    //推荐列表
    reList: function *(){
        var data = this.query;
        var rs = yield vdModel.reList(data);
        yield this.api(rs);
    },

    //获取列表
    list: function *(){
        var data = this.query;
        var rs = yield vdModel.list(data);
        rs.channelList = channelList;
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
    },

    //添加食物
    setall: function *(){
        var data = this.request.body;
        var rs = yield vdModel.setall(data);
        yield this.api(rs);
    },



    //推荐列表管理
    //显示页面
    setchannel: function *(){
        var data = this.query;
        var rs = yield vdModel.setchannel(data.vid, data.channel);
        yield this.api(rs);
    }

};
