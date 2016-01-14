'use strict';

const config = require('../config.json');
const path = require('path');
const R = require('ramda');
const fs = require('fs');
const Q = require('q');
const debug = require('debug')('helper');

const dummyImagePath = path.join(__dirname, '..', 'public/dummy.jpg');

const getCachedPath = R.curry((type, reqPath) => {
  debug(`getCachedPath :: type: %s, reqPath: %s`, type, reqPath);
  debug(`config.cacheRootDir: %s`, config.cacheRootDir);

  return Q(path.join(config.cacheRootDir, type, reqPath));
});

const checkCachedFileExists = R.curry(function(filePath) {
  debug('checkCachedFileExists: filePath: %s', filePath);
  return Q.nfcall(fs.access, filePath, fs.R_OK).then(() => filePath).catch(() => '');
});

const sendJSON = R.curry(function(res, data) {
  return res.status(200).json(data);
});

const sendError = R.curry(function(res, debug, err) {
  debug('<!> Error <!> : %s', err);
  return res.status(500).send(err);
});

const sendImage = R.curry(function(res, path) {
  var img = fs.readFileSync(path);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

module.exports = {
  dummyImagePath: dummyImagePath,
  checkCachedFileExists: checkCachedFileExists,
  sendJSON: sendJSON,
  sendError: sendError,
  sendImage: sendImage,
  getCachedPath: getCachedPath
};
