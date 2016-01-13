"use strict";

const helpers = require('../helpers');
const config = require('../../config.json');

module.exports = (req, res) => helpers.sendJSON(res, config.photoSections)
