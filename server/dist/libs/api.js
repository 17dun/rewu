'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                             * @file json.js
                                                                                                                                                                                                                             * @desc 程序入口
                                                                                                                                                                                                                             * @author xiaoguang01
                                                                                                                                                                                                                             * @date 2015/10/09
                                                                                                                                                                                                                             */

function api(app) {
    app.context.api = _regenerator2.default.mark(function _callee(obj) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                        this.type = 'json';
                        this.body = JSON.stringify(obj);case 2:case 'end':return _context.stop();}}}, _callee, this);});

}

module.exports = api;