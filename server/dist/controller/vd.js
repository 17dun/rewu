'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                             * @file food.js
                                                                                                                                                                                                                             * @desc 食物控制器
                                                                                                                                                                                                                             * @author xiaoguang01
                                                                                                                                                                                                                             * @date 2017/3/7
                                                                                                                                                                                                                             */
var vdModel = require('../model/vd.js');
var channelList = require('../conf').channel;

module.exports = {

    //显示页面
    show: _regenerator2.default.mark(function show() {var users, importTimes;return _regenerator2.default.wrap(function show$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                            vdModel.getUsers());case 2:users = _context.sent;_context.next = 5;return (
                            vdModel.getImportTimes());case 5:importTimes = _context.sent;_context.next = 8;return (
                            this.render('vd', {
                                channelList: channelList,
                                users: users,
                                importTimes: importTimes }));case 8:case 'end':return _context.stop();}}}, show, this);}),




    //显示搜索页
    showSearch: _regenerator2.default.mark(function showSearch() {var word, list;return _regenerator2.default.wrap(function showSearch$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                        word = this.query.word;if (!
                        word) {_context2.next = 7;break;}_context2.next = 4;return (
                            vdModel.getSearchList(word));case 4:list = _context2.sent;_context2.next = 8;break;case 7:

                        list = { data: [] };case 8:_context2.next = 10;return (

                            this.xrender('search', {
                                list: list.data,
                                word: word }));case 10:case 'end':return _context2.stop();}}}, showSearch, this);}),



    play: _regenerator2.default.mark(function play() {var data;return _regenerator2.default.wrap(function play$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                        data = this.query;_context3.next = 3;return (
                            this.xrender('play', {
                                vid: data.vid,
                                num: data.num,
                                target: data.target,
                                user: data.user,
                                time: data.time }));case 3:case 'end':return _context3.stop();}}}, play, this);}),




    //推荐列表
    reList: _regenerator2.default.mark(function reList() {var data, rs;return _regenerator2.default.wrap(function reList$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                        data = this.query;_context4.next = 3;return (
                            vdModel.reList(data));case 3:rs = _context4.sent;_context4.next = 6;return (
                            this.api(rs));case 6:case 'end':return _context4.stop();}}}, reList, this);}),


    //获取列表
    list: _regenerator2.default.mark(function list() {var data, rs;return _regenerator2.default.wrap(function list$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                        data = this.query;_context5.next = 3;return (
                            vdModel.list(data));case 3:rs = _context5.sent;
                        rs.channelList = channelList;_context5.next = 7;return (
                            this.api(rs));case 7:case 'end':return _context5.stop();}}}, list, this);}),




    //获取详细信息
    detail: _regenerator2.default.mark(function detail() {var id, rs;return _regenerator2.default.wrap(function detail$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                        id = this.query.fid;_context6.next = 3;return (
                            vdModel.detail(id));case 3:rs = _context6.sent;_context6.next = 6;return (
                            this.api(rs));case 6:case 'end':return _context6.stop();}}}, detail, this);}),


    //添加食物
    save: _regenerator2.default.mark(function save() {var data, rs;return _regenerator2.default.wrap(function save$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                        data = this.query;_context7.next = 3;return (
                            vdModel.save(data));case 3:rs = _context7.sent;_context7.next = 6;return (
                            this.api(rs));case 6:case 'end':return _context7.stop();}}}, save, this);}),

    //添加食物
    del: _regenerator2.default.mark(function del() {var data, rs;return _regenerator2.default.wrap(function del$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:
                        data = this.query;_context8.next = 3;return (
                            vdModel.del(data));case 3:rs = _context8.sent;_context8.next = 6;return (
                            this.api(rs));case 6:case 'end':return _context8.stop();}}}, del, this);}),


    //添加食物
    delall: _regenerator2.default.mark(function delall() {var data, rs;return _regenerator2.default.wrap(function delall$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:
                        data = this.request.body;_context9.next = 3;return (
                            vdModel.delall(data));case 3:rs = _context9.sent;_context9.next = 6;return (
                            this.api(rs));case 6:case 'end':return _context9.stop();}}}, delall, this);}),


    //添加食物
    setall: _regenerator2.default.mark(function setall() {var data, rs;return _regenerator2.default.wrap(function setall$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:
                        data = this.request.body;_context10.next = 3;return (
                            vdModel.setall(data));case 3:rs = _context10.sent;_context10.next = 6;return (
                            this.api(rs));case 6:case 'end':return _context10.stop();}}}, setall, this);}),




    //推荐列表管理
    //显示页面
    setchannel: _regenerator2.default.mark(function setchannel() {var data, rs;return _regenerator2.default.wrap(function setchannel$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:
                        data = this.query;_context11.next = 3;return (
                            vdModel.setchannel(data.vid, data.channel));case 3:rs = _context11.sent;_context11.next = 6;return (
                            this.api(rs));case 6:case 'end':return _context11.stop();}}}, setchannel, this);}) };