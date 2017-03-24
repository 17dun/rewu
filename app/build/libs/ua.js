"use strict";var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                             * @file json.js
                                                                                                                                                                                                                             * @desc 程序入口
                                                                                                                                                                                                                             * @author xiaoguang01
                                                                                                                                                                                                                             * @date 2015/10/09
                                                                                                                                                                                                                             */


module.exports = {
    renderByUa: _regenerator2.default.mark(function renderByUa(tpl, data) {var uaStr, Agents, flag, v, layout;return _regenerator2.default.wrap(function renderByUa$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        uaStr = this.req.headers['user-agent'];
                        Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
                        flag = true;
                        v = 0;case 4:if (!(v < Agents.length)) {_context.next = 11;break;}if (!(
                        uaStr.indexOf(Agents[v]) > 0)) {_context.next = 8;break;}flag = false;return _context.abrupt("break", 11);case 8:v++;_context.next = 4;break;case 11:


                        //先关闭PC站
                        flag = false;
                        tpl = flag ? tpl : 'm' + tpl;
                        layout = flag ? 'layout' : 'mlayout';
                        data = data;
                        if (data) {
                            data.layout = layout;
                        } else {
                            data = {
                                layout: layout };

                        }_context.next = 18;return (
                            this.render(tpl, data));case 18:case "end":return _context.stop();}}}, renderByUa, this);}) };