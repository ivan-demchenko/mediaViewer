var config = require('./config.json');
var path = require('path');
var fs = require('fs');

function getEntityIcon(reqPath) {
  return function(fileName) {
    return {
      isFile: fileName.match(/.+\.jpg|\.jpeg/i),
      fileName: fileName,
      filePath: path.join(reqPath, fileName)
    }
  };
}

module.exports = {
  readDir: function(reqPath, cb) {
    var fullPath = path.join(config.rootDir, reqPath);

    fs.readdir(fullPath, function(err, data) {
      if (err) return cb(err);
      cb(null, data.map(getEntityIcon(reqPath)));
    });

  }
};
