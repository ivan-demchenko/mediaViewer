var config = require('./config.json');
var path = require('path');
var fs = require('fs');
var Q = require('q');
var R = require('ramda');
var debug = require('debug')('dirReader');

var getEntityDescriptor = R.curry(function(reqPath, fileName) {
  return {
    isFile: fileName.match(/.+\.jpg|\.jpeg/i),
    fileName: fileName,
    filePath: path.join(reqPath, fileName)
  };
});
var transformListing = R.curry(function(reqPath, listing) {
  var xform = R.compose(
    R.filter(R.compose(R.not, R.test(/^\./))),
    R.map(getEntityDescriptor(reqPath))
  );
  return R.into([], xform, listing);
});

module.exports = {
  readDir: function(reqPath) {
    var fullPath = path.join(config.rootDir, reqPath);
    return Q.nfcall(fs.readdir, fullPath).then(transformListing(reqPath));
  }
};
