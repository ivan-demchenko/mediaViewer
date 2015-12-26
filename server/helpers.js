var config = require('./config.json');
var path = require('path');
var R = require('ramda');

module.exports = {

  sendJSON: R.curry(function(res, data) {
    return res.status(200).json(data);
  }),

  sendError: R.curry(function(res, debug, err) {
    debug('err: %s', err);
    return res.status(500).send(err);
  }),

  getCachedPath: function(type, reqPath) {
    return path.join(__dirname, '..', config.cacheDir, type, reqPath);
  }

};
