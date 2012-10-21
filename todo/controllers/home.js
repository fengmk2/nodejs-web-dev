/*!
 * todo - controllers/home.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var Task = require('../models').Task;

module.exports = function home(req, res, next) {
  var options = { sort: [ [ 'finished', 'asc' ], [ '_id', 'desc' ] ] };
  Task.findItems({}, options, function (err, tasks) {
    if (err) {
      return next(err);
    }
    res.render('index.html', {
      tasks: tasks
    });
  });
};