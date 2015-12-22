var config = require('./config.json');
var path = require('path');
var fs = require('fs');
var Q = require('q');
var R = require('ramda');
var easyimg = require('easyimage');
var mkdirp = require('mkdirp');

function getEntityIcon(filePath) {
  return function(fileName) {
    if (fileName.match(/.+\.jpg|\.jpeg/i)) {
      return easyimg.rescrop({
        src: path.join(filePath, fileName),
        dst: path.join(__dirname, '..', config.cacheDir, filePath, fileName),
        width:50, height:50,
        x:0, y:0
      }).then(function(img) {
        return {
          isFile: true,
          fileName: fileName,
          filePath: path.join(filePath, fileName)
        }
      });
    } else {
      return {
        isFile: false,
        fileName: fileName
      }
    }
  };
}

var pAppend = function(promisedAcc, entity) {
  var all = [promisedAcc, Q.when(entity)];
  return Q.all(all).spread(function(a, b) {
    return a.concat(b);
  });
}

module.exports = {
  readDir: function(reqPath, cb) {
    var fullPath = path.join(config.rootDir, reqPath);
    var cacheDir = path.join(__dirname, '..', config.cacheDir, reqPath);

    mkdirp(fullPath, function(err) {
      fs.readdir(fullPath, function(err, data) {
        if (err) return cb(err);
        data.map(getEntityIcon(fullPath)).reduce(pAppend, Q([])).then(cb(null));
      });
    });

  }
};
