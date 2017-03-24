/**
 * @file post-body.js
 * @desc 程序入口
 * @author xiaoguang01
 * @date 2015/10/09
 */

'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _typeof2 = require('babel-runtime/helpers/typeof');var _typeof3 = _interopRequireDefault(_typeof2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _marked = [




































































































































































































receiveBody,






readable2buffer,



















save].map(_regenerator2.default.mark);var extend = require('extend');var path = require('path');var Readable = require('stream').Readable;var bodyParsers = require('koa-bodyparser');var defaultTypeList = { 'text': ['text', 'text/*'], 'json': ['json', 'application/json'], 'urlencoded': ['urlencoded', 'application/x-www-form-urlencoded'], 'multipart': ['multipart', 'multipart/*'], 'buffer': ['buffer', 'application/octet-stream'], 'file': ['image/*'] };var stringTypes = {};var regexpTypes = [];var parsers = module.exports = function (app, config) {/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Extend app with Koa body parsers
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        **/bodyParsers(app);init(config);app.request.__defineSetter__('body', function () {throw new Error('ctx.request.body is read only');});app.request.__defineGetter__('body', function () {return this._body;});app.context.receive = app.request.receive = _regenerator2.default.mark(function _callee() {var accepts,options,type,mainType,receiveConfig,_args = arguments;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!this.request.body) {_context.next = 3;break;}console.warn('ctx.request.receive should be not called after body received and parsed');return _context.abrupt('return', this.request.body);case 3:accepts = [].slice.call(_args);options = {};if (accepts[accepts.length - 1] instanceof Object) {options = accepts.pop();}accepts.forEach(function (accept) {if ('string' !== typeof accept) {throw new Error('ctx.request.receive only accepts string as accepted types, ' + (typeof accept === 'undefined' ? 'undefined' : (0, _typeof3.default)(accept)) + ' received');}});type = this.is.apply(this, accepts);if (type) {_context.next = 10;break;}return _context.abrupt('return', this.throw('Only accepts ' + accepts.join(' '), 405));case 10:mainType = makeMainType(type);receiveConfig = extend(true, {}, config[mainType]);receiveConfig = extend(true, receiveConfig, options);_context.next = 15;return receiveBody(this, mainType, type, receiveConfig);case 15:this.request._body = _context.sent;return _context.abrupt('return', this.request.body);case 17:case 'end':return _context.stop();}}}, _callee, this);});};parsers.middleware = function (config) {config = config || {};var autoParse = ['urlencoded'];if (Array.isArray(config.autoParse)) {autoParse = [];config.autoParse.forEach(function (autoParseItem) {if ('string' !== typeof autoParseItem) {throw new Error('Option of "autoParse" in config "parsers" should be an array of string!');}autoParse.push(autoParserItem);});}return _regenerator2.default.mark(function _callee2(next) {var type;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(type = this.is.apply(this, autoParse))) {_context2.next = 3;break;}_context2.next = 3;return this.receive(type);case 3:_context2.next = 5;return next;case 5:case 'end':return _context2.stop();}}}, _callee2, this);});};function init(config) {config = config || {};var configForAll = config['*'];delete config['*'];var typeList = extend(true, {}, defaultTypeList);if (configForAll) {for (var name in config) {config[name] = extend(true, extend(true, {}, configForAll), config[name]);typeList[name] = config[name].types || defaultTypeList[name] || [];}}var typenameList = [];for (var key in typeList) {var typenames = typeList[key];typenames = Array.isArray(typenames) ? typenames : [typenames];typenames.forEach(function (item) {if (typenameList.indexOf(item) >= 0) {throw new Error('Duplicated type name : ' + item);}typenameList.push(item);if ('string' !== typeof item) {throw new Error('Type item must be a string, ' + (typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) + ' received');}if (item.indexOf('*') < 0) {stringTypes[item] = key;} else {regexpTypes.push({ regexp: new RegExp("^" + item.replace(/\//g, '\\/').replace(/\./g, '\\.').replace(/\*/g, ".*?" + "$")), type: key });}});}}function makeMainType(type) {var mainType = stringTypes[type];if (!mainType) {for (var i = 0; i < regexpTypes.length; i++) {var item = regexpTypes[i];var regexp = item.regexp;var typename = item.type;if (regexp.test(type)) {mainType = typename;break;}};}return mainType;};var receivers = {};var extendedReceivers = {};module.exports.extend = function (name, handler) {if ('string' !== typeof name || !(handler instanceof Function)) {throw new Error('Extends on invalid params, name should be a string, ' + (typeof name === 'undefined' ? 'undefined' : (0, _typeof3.default)(name)) + ' given, handler should be a Function, ' + (typeof handler === 'undefined' ? 'undefined' : (0, _typeof3.default)(handler)) + ' given');}extendedReceivers[name] = handler;};receivers.json = receivers.urlencoded = receivers.text = receivers.buffer = _regenerator2.default.mark(function _callee3(ctx, config, type, mainType) {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return ctx.request[mainType](config.limit);case 2:return _context3.abrupt('return', _context3.sent);case 3:case 'end':return _context3.stop();}}}, _callee3, this);});receivers.file = _regenerator2.default.mark(function _callee4(ctx, config, type, mainType) {return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!config.saveAs) {_context4.next = 9;break;}ctx.req.name = ctx.get('name') || 'userfile';ctx.req.fieldname = ctx.get('fieldname') || 'userfile';ctx.req.mime = ctx.mimeType = type;_context4.next = 6;return save(ctx, config.saveAs, ctx.req);case 6:return _context4.abrupt('return', _context4.sent);case 9:_context4.next = 11;return readable2buffer(ctx.req);case 11:return _context4.abrupt('return', _context4.sent);case 12:case 'end':return _context4.stop();}}}, _callee4, this);});receivers.multipart = _regenerator2.default.mark(function _callee5(ctx, config, type, mainType) {var request, parts, kv, part, paramCount, fileCount, key, value;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:request = ctx.request;parts = request.parts(config);kv = {};paramCount = 0;fileCount = 0;case 5:_context5.next = 7;return parts;case 7:if (!(part = _context5.sent)) {_context5.next = 34;break;}if (!Array.isArray(part)) {_context5.next = 15;break;}paramCount++;key = part[0] || 'param_' + paramCount;value = part[1];kv[key] = value;_context5.next = 32;break;case 15:fileCount++;key = part.fieldname || 'file_' + fileCount;value = { filename: part.filename, name: part.fieldname, mime: part.mime, mimeType: part.mimeType };if (!config.saveAs) {_context5.next = 26;break;}part.name = part.fieldname;part.args = extend(true, {}, kv);_context5.next = 23;return save(ctx, config.saveAs, part);case 23:value.saveAs = _context5.sent;_context5.next = 29;break;case 26:_context5.next = 28;return readable2buffer(part);case 28:value.content = _context5.sent;case 29:if (!(kv[key] !== undefined)) {_context5.next = 31;break;}return _context5.abrupt('return', ctx.throw('Duplicated fieldname', 400));case 31:kv[key] = value;case 32:_context5.next = 5;break;case 34:return _context5.abrupt('return', kv);case 35:case 'end':return _context5.stop();}}}, _callee5, this);});function receiveBody(ctx, mainType, type, config) {return _regenerator2.default.wrap(function receiveBody$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:if (!(config.enable === false)) {_context6.next = 2;break;}return _context6.abrupt('return', ctx.throw(405));case 2:_context6.next = 4;return (extendedReceivers[type] || receivers[mainType] || extendedReceivers[mainType])(ctx, config, type, mainType);case 4:return _context6.abrupt('return', _context6.sent);case 5:case 'end':return _context6.stop();}}}, _marked[0], this);};function readable2buffer(readable) {return _regenerator2.default.wrap(function readable2buffer$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:if (readable instanceof Readable) {_context7.next = 2;break;}throw new Error('Param readable must be an instance of Readable!');case 2:return _context7.abrupt('return', new Promise(function (resolve, reject) {var buffer = [];readable.on('data', function (chunk) {buffer.push(chunk);});readable.on('end', function () {buffer = Buffer.concat(buffer);return resolve(buffer);});readable.on('error', function (e) {return reject(e);});}));case 3:case 'end':return _context7.stop();}}}, _marked[1], this);}var rootPath = path.dirname(process.mainModule.filename);function save(ctx, saveAs, readable) {var savePath, propname, prop, proptype;return _regenerator2.default.wrap(function save$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:if (saveAs instanceof Function) {
                        savePath = saveAs(readable);
                    } else
                    if ('string' === typeof saveAs) {
                        savePath = saveAs;
                        for (propname in readable) {
                            prop = readable[propname];
                            proptype = typeof prop === 'undefined' ? 'undefined' : (0, _typeof3.default)(prop);
                            if (['string', 'number', 'boolean'].indexOf(proptype) >= 0 && savePath.indexOf(propname)) {
                                savePath = savePath.replace(new RegExp('{' + propname + '}', 'g'), prop);
                            }
                        }
                    }
                    savePath = path.join(rootPath, savePath);if (!(
                    savePath.slice(0, rootPath.length) !== rootPath)) {_context8.next = 4;break;}throw (
                        new Error('Error permission denied!'));case 4:_context8.next = 6;return (

                        ctx.save(readable, savePath));case 6:return _context8.abrupt('return',
                    savePath);case 7:case 'end':return _context8.stop();}}}, _marked[2], this);}