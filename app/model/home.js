var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = require('../../conf').db;
var ObjectId =  require('mongodb').ObjectID;
module.exports = {
    list: function(start){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                collection.find().skip(start*50).limit(50).sort({_id:-1}).toArray(function(err, rt){
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

    getTopList: function(){
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function(err, db){
                var collection = db.collection('vds');
                collection.find().limit(7).sort({num:-1}).toArray(function(err, rt){
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
    }
}
