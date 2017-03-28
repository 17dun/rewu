/**
 * @file food.js
 * @desc 用户模型
 * @author xiaoguang01
 * @date 2016/3/7
 */
var MongoClient = require('mongodb').MongoClient;
import conf from '../conf';
const DB_CONN_STR = conf.db;
var ObjectId =  require('mongodb').ObjectID;
var channelList = require('../conf').channel;
module.exports = {

    reList: function(data){
        var user = data.user;
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                var rd = Math.floor(Math.random()*1000);
                collection.find({channel:'1', randomNum:{$gt:rd}}).limit(20).sort({randomNum:1}).toArray(function(err, rt){
                    if(err){
                        resovel({
                            code: 1,
                            msg: '数据库查询失败',
                            data: err
                        });
                    }else{
                        resovel({
                            code: 0,
                            msg: '查询成功',
                            data: rt
                        });
                    }
                });
            });
        });
    },


    getSearchList: function(word){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                collection.find({"name": {$regex:word}}).limit(100).sort({_id:-1}).toArray(function(err, rt){
                    if(err){
                        resovel({
                            code: 1,
                            msg: '数据库查询失败',
                            data: err
                        });
                    }else{
                        resovel({
                            code: 0,
                            msg: '查询成功',
                            data: rt
                        });
                    }
                });
            });
        });
    },

    getUsers: function(){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                collection.distinct('user',function(err, rt){
                    if(err){
                        resovel({
                            code: 1,
                            msg: '数据库查询失败',
                            data: err
                        });
                    }else{
                        resovel(rt.reverse());
                    }
                })
            });
        });
    },

    getImportTimes: function(){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                collection.distinct('importTime',function(err, rt){
                    if(err){
                        resovel({
                            code: 1,
                            msg: '数据库查询失败',
                            data: err
                        });
                    }else{
                        resovel(rt.reverse());
                    }
                })
            });
        });
    },

    list: function(data){
        var self = this;
        var pageSize = data.pageSize*1 || 100;
        if(data.pageNum){
            from = (data.pageNum - 1) * data.pageSize;
        }else{
            from = 0;
        }
        var find = {};
        if(data.vdName){
            find.name = {$regex:data.vdName};
        }
        if(data.vdUser){
            find.user = {$regex:data.vdUser};
        }
        if(data.vdId){
            find.vid = data.vdId;
        }
        if(data.vdChannel){
            find.channel = data.vdChannel;
        }
        if(data.vdImport){
            find.importTime = data.vdImport*1;
        }
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                collection.find(find).skip(from).limit(pageSize).sort({_id:-1}).toArray(function(err, rt){
                    if(err){
                        resovel({
                            code: 1,
                            msg: '数据库查询失败',
                            data: err
                        });
                    }else{
                        collection.stats({},function(err,rt2){
                            for(var i=0; i<rt.length; i++){
                                rt[i].channelTitle = self.getChannelTitle(rt[i].channel);
                            }
                            resovel({
                                code: 0,
                                msg: '查询成功',
                                allNum: rt2.count,
                                data: rt

                            });
                        })

                    }
                });
            });
        });
    },
    getChannelTitle: function(channelId){
        for(var i=0; i<channelList.length;i++){
            if(channelList[i].id == channelId){
                return channelList[i].title;
                break;
            }
        }
    },
    save: function(data){
        var self = this;
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                if(data._id){
                    //保存已有的
                    data._id = ObjectId(data._id);
                }else{
                    data.status = 0;
                    data.taskNum = 0;
                    delete data._id;
                }

                collection.save(data, function(err, rt){
                    if(err){
                        resovel({
                            code: 1,
                            msg: '失败'
                        });
                    }else{
                        resovel({
                            code: 0,
                            msg: '成功'
                        });
                    }
                });
            });
        });
    },
    saveList: function(){

    },
    del: function(data){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                var whereStr = {_id:ObjectId(data.id)}
                collection.remove(whereStr, function(err, rt){
                    if(err){
                        resovel({
                            code: 1,
                            msg: '失败'
                        });
                    }else{
                        resovel({
                            code: 0,
                            msg: '成功'
                        });
                    }
                })
            });
        });
    },
    delall: function(data){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                var num = 0;
                if(!data.ids||!data.ids.length){
                    resovel({
                        code: 1,
                        msg: '失败'
                    });
                    return;
                }
                data.ids.forEach(function(item){
                    var whereStr = {_id:ObjectId(item)}
                    collection.remove(whereStr, function(err, rt){
                        if(err){
                            resovel({
                                code: 1,
                                msg: '失败'
                            });
                        }else{
                            num++;
                            if(num==data.ids.length){
                                resovel({
                                    code: 0,
                                    msg: '成功'
                                });
                            }
                        }
                    });
                });
            });
        });
    },


    setall: function(data){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                var num = 0;
                if(!data.ids||!data.ids.length){
                    resovel({
                        code: 1,
                        msg: '失败'
                    });
                    return;
                }
                data.ids.forEach(function(item){
                    var whereStr = {_id:ObjectId(item)}
                    var setChannelTime = new Date().getTime();
                    collection.update(whereStr, {$set:{channel: data.channel,setChannelTime: setChannelTime}}, function(err, rt){
                        if(err){
                            resovel({
                                code: 1,
                                msg: '失败'
                            });
                        }else{
                            num++;
                            if(num==data.ids.length){
                                resovel({
                                    code: 0,
                                    msg: '成功'
                                });
                            }
                        }
                    });
                });
            });
        });
    },
    
    detail: function(fid){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                var whereStr = {_id:ObjectId(fid)}
                collection.find(whereStr).toArray(function(err, rt){
                    if(err){
                        resovel({
                            code: 1,
                            msg: '数据库查询失败',
                            data: err
                        });
                    }else{
                        resovel({
                            code: 0,
                            msg: '查询成功',
                            data: rt
                        });
                    }
                });
            });
        });
    },


    setchannel: function(vid,channel){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                var setChannelTime = new Date().getTime();
                collection.update({_id: ObjectId(vid)}, {$set:{channel: channel,setChannelTime: setChannelTime}}, function(err, rt){
                    if(err){
                        resovel({
                            code: 1,
                            msg: '失败'
                        });
                    }else{
                        resovel({
                            code: 0,
                            msg: '成功'
                        });
                    }
                });
            });
        });
    }
}
