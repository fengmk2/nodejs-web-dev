/**!
 * todo - test/controllers/home.test.js
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

var should = require('should');
var request = require('supertest');
var app = require('../../app');

describe('controllers/home.test.js', function () {
  before(function (done) {
    app = app.listen(0, done);
  });

  describe('GET /', function () {
    it('should show home page', function (done) {
      request(app)
      .get('/')
      .expect(200)
      .expect(/<title>TODO<\/title>/, done);
    });
  });
});
