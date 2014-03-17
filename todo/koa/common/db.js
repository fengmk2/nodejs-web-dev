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

var leveldb = require('level');
var config = require('../config');
var thunkify = require('thunkify-wrap');

var db = leveldb(config.db, {
  valueEncoding: 'json'
});

thunkify(db, ['get', 'put']);
module.exports = db;
