"use strict";

const helpers = require('./helpers');

module.exports = {

  getPhoto: (reqType, reqPath) => {
    helpers.getCachedPath(reqType, reqPath)
    .then(helpers.checkCachedFileExists)
    .then((exists) => exists ? exists : helpers.dummyImagePath);
  }

};
