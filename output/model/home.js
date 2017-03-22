'use strict';var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = require('../conf').db;
var ObjectId = require('mongodb').ObjectID;
module.exports = {
    list: function list(start) {
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function (err, db) {
                var collection = db.collection('vds');
                var rd = Math.floor(Math.random() * 10000);
                console.log(rd);
                collection.find({ channel: { $ne: '0' }, randomNum: { $gt: rd } }).skip(start * 30).limit(30).sort({ randomNum: 1 }).toArray(function (err, rt) {
                    if (err) {
                        resovel({
                            code: 1,
                            msg: '数据库查询失败',
                            data: err });

                    } else {

                        resovel({
                            code: 0,
                            msg: '查询成功',
                            data: rt });

                    }
                });
            });
        });
    },

    getTopList: function getTopList() {
        return new Promise(function (resovel, reject) {
            MongoClient.connect(DB_CONN_STR, function (err, db) {
                var collection = db.collection('vds');
                collection.find({ channel: '0' }).limit(41).sort({ setChannelTime: -1 }).toArray(function (err, rt) {
                    if (err) {
                        resovel({
                            code: 1,
                            msg: '数据库查询失败',
                            data: err });

                    } else {
                        resovel({
                            code: 0,
                            msg: '查询成功',
                            data: rt });

                    }
                });
            });
        });
    } };