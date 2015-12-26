var config = require('./config.json');
var path = require('path');
var fs = require('fs');
var R = require('ramda');
var dirReader = require('./dirReader');
var querystring = require('querystring');
var serveImage = require('./serveImage');
var debug = require('debug')('router');
var helpers = require('./helpers');

var sendImage = R.curry(function(res, path) {
  var img = fs.readFileSync(path);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/photo', function(req, res) {
    var reqType = req.query.type;
    var reqPath = querystring.unescape(req.query.path);

    debug('reqType: %s', reqType);
    debug('reqPath: %s', reqPath);

    serveImage.checkCachedFileExists(reqType, reqPath)
    .then(sendImage(res))
    .catch(function() {
      return serveImage.prepareCachedImage(reqType, reqPath)
      .then(sendImage(res))
      .catch(helpers.sendError(res, debug));
    });
  });

  app.get('/ls', function(req, res) {
    dirReader.readDir(req.query.path)
    .then(helpers.sendJSON(res))
    .catch(helpers.sendError(res, debug));
  });

};
