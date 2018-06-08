'use strict';

const iOSUtils = require('..');
const assert = require('assert');

describe('test', function() {
  it('should be ok', function *() {
    var xcodePath = yield iOSUtils.getXcodePath();
    assert.ok(xcodePath);
    console.log(xcodePath);
    var xcodeVersion = yield iOSUtils.getXcodeVersion();
    assert.ok(xcodeVersion);
    console.log(xcodeVersion);
    var iOSSDKVersion = yield iOSUtils.getIOSSDKVersion();
    assert.ok(iOSSDKVersion);
    console.log(iOSSDKVersion);
  });
});
