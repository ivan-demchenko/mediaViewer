var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');

var config = require('../config.json');
if (!config) {
  console.log('Error: config file is missing!');
  return;
}

var app = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, '../client')));
app.use(morgan('dev'));

router(app);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
