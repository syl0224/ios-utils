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

var iOSUtils = require('..');

describe('test', function() {
  it('should be ok', function *(done) {
    var xcodePath = yield iOSUtils.getXcodePath();
    console.log(xcodePath);
    var xcodeVersion = yield iOSUtils.getXcodeVersion();
    console.log(xcodeVersion);
    var iOSSDKVersion = yield iOSUtils.getIOSSDKVersion();
    console.log(iOSSDKVersion); 
    done();
  });
});
