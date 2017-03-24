'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                             * @file food.js
                                                                                                                                                                                                                             * @desc 食物控制器
                                                                                                                                                                                                                             * @author xiaoguang01
                                                                                                                                                                                                                             * @date 2017/3/7
                                                                                                                                                                                                                             */
var vdModel = require('../model/home.js');

module.exports = {
    //显示页面
    show: _regenerator2.default.mark(function show() {var list, top;return _regenerator2.default.wrap(function show$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                            vdModel.list(0));case 2:list = _context.sent;_context.next = 5;return (
                            vdModel.getTopList());case 5:top = _context.sent;_context.next = 8;return (
                            this.xrender('home', {
                                list: list.data,
                                top: top.data }));case 8:case 'end':return _context.stop();}}}, show, this);}),



    //获取列表
    list: _regenerator2.default.mark(function list() {var data, start, rs;return _regenerator2.default.wrap(function list$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                        data = this.query;
                        if (data) {
                            start = data.start * 1;
                        } else {
                            start = 0;
                        }_context2.next = 4;return (
                            vdModel.list(start));case 4:rs = _context2.sent;_context2.next = 7;return (
                            this.api(rs));case 7:case 'end':return _context2.stop();}}}, list, this);}) };