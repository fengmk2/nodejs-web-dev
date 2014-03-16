/**!
 * todo - controllers/home.js
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

module.exports = function home(req, res, next) {
  Task.list(function (err, tasks) {
    if (err) {
      return next(err);
    }
    res.render('index.html', {
      tasks: tasks
    });
  });
};
