var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: path.join(__dirname, 'client/src/app.jsx'),

  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['jsx', 'babel'],
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      path.join(__dirname, 'client/src'),
      'node_modules',
    ],
  },

};
