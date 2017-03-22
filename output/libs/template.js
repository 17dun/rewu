/*!
 * koa-ejs - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
               * Module dependencies.
               */var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var copy = require('copy-to');
var path = require('path');
var fs = require('co-fs');
var ejs = require('ejs');

/**
                           * default render options
                           * @type {Object}
                           */
var defaultSettings = {
  cache: true,
  layout: 'layout',
  viewExt: 'html',
  open: '<%',
  close: '%>',
  filters: {},
  locals: {},
  debug: false,
  writeResp: true };




/**
                      * set app.context.render
                      *
                      * usage:
                      * ```
                      * yield *this.render('user', {name: 'dead_horse'});
                      * ```
                      * @param {Application} app koa application instance
                      * @param {Object} settings user settings
                      */
exports = module.exports = function (app, settings) {var _marked = [





































  render].map(_regenerator2.default.mark);if (app.context.render) {return;}if (!settings || !settings.root) {throw new Error('settings.root required');}settings.root = path.resolve(process.cwd(), settings.root);settings.pagedir = settings.pagedir || 'page'; /**
                                                                                                                                                                                                                                                                  * cache the generate package
                                                                                                                                                                                                                                                                  * @type {Object}
                                                                                                                                                                                                                                                                  */var cache = Object.create(null);copy(defaultSettings).to(settings);settings.viewExt = settings.viewExt ? '.' + settings.viewExt.replace(/^\./, '') : ''; // ejs global options
  // WARNING: if use koa-ejs in multi server
  // filters will regist in one ejs instance
  for (var name in settings.filters) {ejs.filters[name] = settings.filters[name];} /**
                                                                                    * generate html with view name and options
                                                                                    * @param {String} view
                                                                                    * @param {Object} options
                                                                                    * @return {String} html
                                                                                    */function render(view, options) {var viewPath, tpl, fn;return _regenerator2.default.wrap(function render$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:view += settings.viewExt;viewPath = path.join(settings.root, view); // get from cache
            if (!(settings.cache && cache[viewPath])) {_context2.next = 4;break;}return _context2.abrupt('return', cache[viewPath].call(options.scope, options));case 4:_context2.next = 6;return fs.readFile(viewPath, 'utf8');case 6:tpl = _context2.sent;fn = ejs.compile(tpl, { filename: viewPath, _with: settings._with, compileDebug: settings.debug,
              open: settings.open,
              close: settings.close });

            if (settings.cache) {
              cache[viewPath] = fn;
            }return _context2.abrupt('return',

            fn.call(options.scope, options));case 10:case 'end':return _context2.stop();}}}, _marked[0], this);}



  app.context.render = _regenerator2.default.mark(function _callee(view, _context) {var context, html, layout, writeResp;return _regenerator2.default.wrap(function _callee$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            context = {
              noWrap: false,
              pageName: view,
              env: this.env,
              useLess: settings.useLess || false };

            merge(context, this.state);
            merge(context, _context);return _context3.delegateYield(
            render(settings.pagedir + '/' + view, context), 't0', 4);case 4:html = _context3.t0;

            layout = context.layout === false ? false : context.layout || settings.layout;if (!
            layout) {_context3.next = 10;break;}
            // if using layout
            context.body = html;return _context3.delegateYield(
            render(layout, context), 't1', 9);case 9:html = _context3.t1;case 10:


            writeResp = context.writeResp === false ? false : context.writeResp || settings.writeResp;if (!
            writeResp) {_context3.next = 16;break;}
            //normal operation
            this.type = 'html';
            this.body = html;_context3.next = 17;break;case 16:return _context3.abrupt('return',


            html);case 17:case 'end':return _context3.stop();}}}, _callee, this);});



  // 增加一个外部方法，用于强制返回的方式调用ejs
  app.context.toHtml = _regenerator2.default.mark(function _callee2(view, _context) {var context, html;return _regenerator2.default.wrap(function _callee2$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            context = {};
            merge(context, this.state);
            merge(context, _context);return _context4.delegateYield(
            render(view, context, true), 't0', 4);case 4:html = _context4.t0;return _context4.abrupt('return',
            html);case 6:case 'end':return _context4.stop();}}}, _callee2, this);});

};

/**
    * Expose ejs
    */

exports.ejs = ejs;

/**
                    * merge source to target
                    *
                    * @param {Object} target
                    * @param {Object} source
                    * @return {Object}
                    * @api private
                    */
function merge(target, source) {
  for (var key in source) {
    target[key] = source[key];
  }
}