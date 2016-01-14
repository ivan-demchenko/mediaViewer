'use strict';

const debug = require('debug')('routes:photo');
const helpers = require('../helpers');
const querystring = require('querystring');
const service = require('../service');

module.exports = (req, res) => {
  let reqType = req.query.type;
  let reqPath = querystring.unescape(req.query.path);

  debug('reqType: %s', reqType);
  debug('reqPath: %s', reqPath);

  service.getPhoto(reqType, reqPath)
  .then(helpers.sendImage(res))
  .catch(helpers.sendError(res, debug));
};
