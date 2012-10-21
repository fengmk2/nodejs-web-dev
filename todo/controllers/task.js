/*!
 * todo - controllers/task.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var Task = require('../models').Task;

exports.add = function (req, res, next) {
  var title = req.body.title;
  var task = { title: title, finished: 0, created_at: new Date() };
  Task.insert(task, function (err, item) {
    if (err) {
      return next(err);
    }
    res.writeHeader(302, {
      Location: '/'
    });
    res.end();
  });
};

exports.finish = function (req, res, next) {
  var tid = req.params.id;
  var task = { finished: 1, updated_at: new Date() };
  Task.updateById(tid, { $set: task }, function (err, item) {
    if (err) {
      return next(err);
    }
    res.writeHeader(302, {
      Location: '/'
    });
    res.end();
  });
};
