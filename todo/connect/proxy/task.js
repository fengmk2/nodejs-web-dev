/**!
 * todo - proxy/task.js
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

var utility = require('utility');
var crypto = require('crypto');
var db = require('../common/db');

exports.insert = function (task, callback) {
  var id = utility.md5(task.title + crypto.randomBytes(60).toString('hex'));
  db.put(id, task, function (err) {
    callback(err, id);
  });
};

exports.updateById = function (id, task, callback) {
  db.get(id, function (err, row) {
    if (err) {
      return callback(err);
    }
    for (var k in task) {
      row[k] = task[k];
    }
    db.put(id, row, callback);
  });
};

exports.list = function (callback) {
  var err = null;
  var items = [];
  var finishes = [];
  db.createReadStream()
  .on('data', function (data) {
    var value = data.value;
    value.id = data.key;
    if (value.finished) {
      finishes.push(value);
    } else {
      items.push(value);
    }
  })
  .on('error', function (err) {
    err = err;
  })
  .on('end', function () {
    items.sort(function (a, b) {
      return a.created_at > b.created_at ? -1 : 1;
    });
    finishes.sort(function (a, b) {
      return a.created_at > b.created_at ? -1 : 1;
    });
    callback(err, items.concat(finishes));
  });
};
