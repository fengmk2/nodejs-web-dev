/*!
 * todo - config.js
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

var version = require('./package.json').version;
var path = require('path');

var config = {
  version: version,
  debug: true,
  port: 1984,
  session_secret: 'todo session secret',
  db: path.join(__dirname, 'todo.db'),
  // db: 'mongodb://127.0.0.1/simple_todo3'
};

module.exports = config;
