"use strict";

const config = require('../config.json');
const path = require('path');
const fs = require('fs');
const Q = require('q');
const R = require('ramda');
const debug = require('debug')('dirReader');

const getEntityDescriptor = R.curry((reqDirPath, fileName) => {
  return {
    isFile: fileName.match(/.+\.jpg|\.jpeg/i),
    fileName: fileName,
    filePath: path.join(reqDirPath, fileName)
  };
});

const filesListToDescrList = R.curry((reqDirPath, listing) => {
  let xform = R.compose(
    R.filter(R.compose(R.not, R.test(/^\./))),
    R.map(getEntityDescriptor(reqDirPath))
  );
  return R.into([], xform, listing);
});

module.exports = (reqDirPath) => {
  var fullPath = path.join(config.rootDir, reqDirPath);
  return Q.nfcall(fs.readdir, fullPath).then(filesListToDescrList(reqDirPath));
};
