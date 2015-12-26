var config = require('./config.json');
var imgResize = require('./img-resize');
var fs = require('fs');
var Q = require('q');
var R = require('ramda');
var debug = require('debug')('serveImage');
var helpers = require('./helpers');

module.exports = {

  checkCachedFileExists: R.curry(function(reqType, reqPath) {
    debug('checkCachedFileExists');
    var cacheFilePath = helpers.getCachedPath(reqType, reqPath);
    debug('cacheFilePath: %s', cacheFilePath);
    return Q.nfcall(fs.access, cacheFilePath, fs.R_OK).then(R.always(cacheFilePath));
  }),

  prepareCachedImage: R.curry(function(reqType, reqPath) {
    debug('makeThumb of type %s of file %s', reqType, reqPath);
    var cacheFilePath = helpers.getCachedPath(reqType, reqPath);
    debug('cacheFilePath: %s', cacheFilePath);
    return imgResize.resize(reqType, reqPath).then(R.always(cacheFilePath));
  })

};
