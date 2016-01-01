"use strict";

const config = require('../config.json');
const readDir = require('./readDir');
const querystring = require('querystring');
const debug = require('debug')('router');
const helpers = require('./helpers');
const service = require('./service');

module.exports = function routerSetup(app) {

  app.get('/', (req, res) => res.render('index'));

  app.get('/photo-sections', (req, res) => helpers.sendJSON(res, config.photoSections));

  app.get('/photo', (req, res) => {
    let reqType = req.query.type;
    let reqPath = querystring.unescape(req.query.path);

    debug('reqType: %s', reqType);
    debug('reqPath: %s', reqPath);

    service.getPhoto(reqType, reqPath)
    .then(helpers.sendImage(res))
    .catch(helpers.sendError(res, debug));
  });

  app.get('/ls', (req, res) => {
    let basePath = req.query.basepath;
    let reqPath = querystring.unescape(req.query.path);

    debug('basePath: %s', basePath);
    debug('reqPath: %s', reqPath);

    readDir(basePath, reqPath)
    .then(helpers.sendJSON(res))
    .catch(helpers.sendError(res, debug));
  });

};
