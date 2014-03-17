/**!
 * todo - controllers/task.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var Task = require('../proxy/task');

exports.add = function *() {
  var title = this.request.body.title;
  var task = { title: title, finished: 0, created_at: new Date() };
  yield Task.insert(task);
  this.redirect('/');
};

exports.finish = function *() {
  var tid = this.params.id;
  var task = { finished: 1, updated_at: new Date() };
  yield Task.updateById(tid, task);
  this.redirect('/');
};
