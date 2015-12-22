var config = require('./config.json');
var path = require('path');
var fs = require('fs');
var R = require('ramda');
var dirReader = require('./dirReader');
var querystring = require('querystring');
var serveImage = require('./serveImage');

var notDotFile = R.compose(R.not, R.test(/^\./));

var withOutDotFiles = R.filter( R.where({ fileName: notDotFile }) );

function sendImage(path, res) {
  return function() {
    var img = fs.readFileSync(path);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  };
}

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/thumb/*', function(req, res) {
    var reqPath = querystring.unescape(req.path);
    var cachePath = path.join(__dirname, '..', config.cacheDir, reqPath);

    serveImage.checkFileExists(cachePath)
    .then(sendImage(cachePath, res))
    .catch(function() {
      var srcPath = path.join(config.rootDir, reqPath.substr(6));
      var dstPath = path.join(__dirname, '..', config.cacheDir, reqPath);
      serveImage.makeThumb(srcPath, dstPath).then(sendImage(dstPath, res))
    })
  });

  app.get('/preview/*', function(req, res) {
    var reqPath = querystring.unescape(req.path);
    var cachePath = path.join(__dirname, '..', config.cacheDir, reqPath);

    serveImage.checkFileExists(cachePath)
    .then(sendImage(cachePath, res))
    .catch(function() {
      var srcPath = path.join(config.rootDir, reqPath.substr(8));
      var dstPath = path.join(__dirname, '..', config.cacheDir, reqPath);
      serveImage.makePreview(srcPath, dstPath).then(sendImage(dstPath, res))
    })
  });

  app.get('/ls', function(req, res) {
    dirReader.readDir(req.query.path, R.curry(function(err, resulr) {
      if (err) return res.status(500).json(err);
      return res.status(200).json(withOutDotFiles(resulr));
    }));
  });

};
