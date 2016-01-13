"use strict";

const debug = require('debug')('route:ls');
const querystring = require('querystring');
const helpers = require('../helpers');
const readDir = require('../readDir');

module.exports = (req, res) => {
  let reqPath = querystring.unescape(req.query.path);

  debug('reqPath: %s', reqPath);

  readDir(reqPath)
  .then(helpers.sendJSON(res))
  .catch(helpers.sendError(res, debug));
};
