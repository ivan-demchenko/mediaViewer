'use strict';

const helpers = require('./helpers');
const debug = require('debug')('service');

module.exports = {

  getPhoto: (reqType, reqPath) => {
    debug(`getPhoto :: reqType: #{reqType}, reqPath #{reqPath}`);

    return helpers.getCachedPath(reqType, reqPath)
    .then(helpers.checkCachedFileExists)
    .then((exists) => exists ? exists : helpers.dummyImagePath);
  },

};
