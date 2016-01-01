"use strict";

const config = require('../config.json');
const path = require('path');
const fs = require('fs');
const Q = require('q');
const R = require('ramda');
const debug = require('debug')('dirReader');

const getEntityDescriptor = R.curry((fullPath, fileName) => {
  return {
    isFile: fileName.match(/.+\.jpg|\.jpeg/i),
    fileName: fileName,
    filePath: path.join(fullPath, fileName)
  };
});

const filesListToDescrList = R.curry((fullPath, listing) => {
  let transducer = R.compose(
    R.filter(R.compose(R.not, R.test(/^\./))),
    R.map(getEntityDescriptor(fullPath))
  );
  return R.into([], transducer, listing);
});

module.exports = (basePath, reqPath) => {
  var fullPath = path.join(basePath, reqPath);
  return Q.nfcall(fs.readdir, fullPath).then(filesListToDescrList(fullPath));
};
