/**!
 * tod - common/db.js
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

var leveldb = require('levelup');
var memdown = require('memdown');
var config = require('../config');
var thunkify = require('thunkify-wrap');

var db = leveldb('/does/not/matter', {
  valueEncoding: 'json',
  db: memdown
});

thunkify(db, ['get', 'put']);
module.exports = db;
