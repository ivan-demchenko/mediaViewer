var config = require('./config.json');
var easyimg = require('easyimage');
var mkdirp = require('mkdirp');
var fs = require('fs');
var Q = require('q');

module.exports = {

  checkFileExists: function(path) {
    return Q.nfcall(fs.access, path, fs.R_OK);
  },

  makeThumb: function(srcPath, dstPath) {
    return easyimg.rescrop({
      src: srcPath, dst: dstPath,
      width:50, height:50,
      x:0, y:0, quality: 100
    })
  },

  makePreview: function(srcPath, dstPath) {
    return easyimg.rescrop({
      src: srcPath, dst: dstPath,
      width:1000, height:1000,
      x:0, y:0
    })
  }

};
