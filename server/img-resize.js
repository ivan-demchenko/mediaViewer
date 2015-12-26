var Q = require('q');
var config = require('./config.json');
var spawn = require('child_process').spawn;
var path = require('path');
var debug = require('debug')('imgResize');

module.exports = {

  resize: function(reqType, reqPath) {
    return Q.Promise(function(res, rej) {
      var scriptPath = path.join(__dirname, '..', 'img.sh');

      var REQ_PATH = path.dirname(reqPath);
      var REQ_FILE = path.basename(reqPath);
      var ROOT_PATH = config.rootDir;
      var CACHE_PATH = path.join(config.cacheDir, reqType);
      var IMG_SIZE = `${config.generatedImages[reqType].w}x${config.generatedImages[reqType].h}`;

      var convert = spawn(scriptPath, [
        `--req-path=${REQ_PATH}`,
        `--req-file=${REQ_FILE}`,
        `--root-path=${ROOT_PATH}`,
        `--cache-path=${CACHE_PATH}`,
        `--new-size=${IMG_SIZE}`
      ]);

      convert.stdout.on('data', function(data) {
        debug('stdout: ' + data);
      });

      convert.stderr.on('data', function(data) {
        debug('stderr: ' + data);
        rej(data);
      });

      convert.on('close', function(code) {
        debug('child process exited with code ' + code);
        res(true);
      });

    });
  }

};
