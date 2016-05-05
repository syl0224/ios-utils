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

const path = require('path');

const _ = require('./helper');

exports.getXcodePath = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = 'xcode-select --print-path';

  var promise = _.exec(cmd);

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      promise.then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      console.log('get xcode path failed');
    }
  } else {
    return promise;
  }
};

exports.getXcodeVersion = function() {
  var args = Array.prototype.slice.call(arguments);

  var promise = new Promise((resolve, reject) => {
    this.getXcodePath().then(xcodePath => {
      var plistPath = path.resolve(xcodePath, '..', 'Info.plist');
      var cmd = `/usr/libexec/PlistBuddy -c "Print CFBundleShortVersionString" "${plistPath}"`;
      _.exec(cmd).then(data => {
        resolve(data);
      }).catch(err => {
        reject(`exec ${cmd} error with: ${err}`);
      });
    });
  });

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      promise.then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, err);
      });
    } else {
      console.log('get xcode version failed');
    }
  } else {
    return promise;
  }
};

exports.getIOSSDKVersion = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = 'xcrun --sdk iphonesimulator --show-sdk-version';

  var promise = _.exec(cmd);

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      promise.then(data => {
        cb.call(this, null, data);
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      console.log('get ios sdk version failed');
    }
  } else {
    return promise;
  }
};

exports.getBundleId = function() {
  var args = Array.prototype.slice.call(arguments);
  const app = path.resolve(args[0]);
  const plistPath = path.resolve(app, 'Info.plist');

  var promise = new Promise((resolve, reject) => {
    _.bplist.parseFile(plistPath, (err, obj) => {
      if (err) {
        reject(err);
      }
      const bundleId = obj[0].CFBundleIdentifier;

      if (!bundleId) {
        return reject(`There is no bundleId in plist: ${plistPath}`);
      }
      console.log(`Get bundleId ${bundleId} from plist ${plistPath}`);
      resolve(bundleId);
    });
  });

  if (args.length > 1) {
    var cb = args[1];
    promise.then(bundleId => {
      cb.call(this, null, bundleId);
    }).catch(err => {
      cb.call(this, `get bundleId failed with: ${err}`);
    });
  } else {
    return promise;
  }
};
