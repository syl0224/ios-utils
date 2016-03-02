/* ================================================================
 * ios-utils by xdf(xudafeng[at]126.com)
 *
 * first created at : Wed Mar 02 2016 17:12:12 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const _ = require('xutil');
const bplist = require('bplist-parser');
const childProcess = require('child_process');

_.exec = function(cmd, opts) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(cmd, _.merge({
      maxBuffer: 1024 * 512,
      wrapArgs: false
    }, opts || {}), function(err, stdout) {
      if (err) {
        return reject(err);
      }
      resolve(_.trim(stdout));
    });
  });
};

_.bplist = bplist;

module.exports = _;
