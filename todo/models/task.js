/*!
 * todo - models/task.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var db = require('./db');

var noop = function () {};

db.bind('task');
db.task.ensureIndex({ finished: 1 }, noop);

module.exports = db.task;