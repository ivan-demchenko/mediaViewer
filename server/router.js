var path = require('path');
var fs = require('fs');
var R = require('ramda');
var dirReader = require('./dirReader');

var notDotFile = R.compose(R.not, R.test(/^\./));

var withOutDotFiles = R.filter( R.where({ fileName: notDotFile }) );


module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/ls', function(req, res) {
    dirReader.readDir(req.query.path, R.curry(function(err, resulr) {
      if (err) return res.status(500).json(err);
      return res.status(200).json(withOutDotFiles(resulr));
    }));
  });

};
