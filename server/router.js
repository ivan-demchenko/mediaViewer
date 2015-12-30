"use strict";

const config = require('../config.json');
const path = require('path');
const fs = require('fs');
const R = require('ramda');
const readDir = require('./readDir');
const querystring = require('querystring');
const debug = require('debug')('router');
const helpers = require('./helpers');

module.exports = function routerSetup(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/photo', function(req, res) {
    let reqType = req.query.type;
    let reqPath = querystring.unescape(req.query.path);

    debug('reqType: %s', reqType);
    debug('reqPath: %s', reqPath);

    helpers.getCachedPath(reqType, reqPath)
    .then(helpers.checkCachedFileExists)
    .then((exists) => {
      helpers.sendImage(res, exists ? exists : helpers.dummyImagePath);
    })
    .catch(helpers.sendError(res, debug));
  });

  app.get('/ls', function(req, res) {
    let reqPath = querystring.unescape(req.query.path);
    debug('reqPath: %s', reqPath);
    readDir(reqPath)
    .then(helpers.sendJSON(res))
    .catch(helpers.sendError(res, debug));
  });

};
