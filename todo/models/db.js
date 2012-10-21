/*!
 * todo - models/db.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var mongoskin = require('mongoskin');
var config = require('../config');

var db = mongoskin.db(config.db, { safe: true });
module.exports = db;