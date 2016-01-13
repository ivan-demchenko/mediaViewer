"use strict";

const routes = {
  index: require('./routes/index'),
  homeItems: require('./routes/home-items'),
  photo: require('./routes/photo'),
  ls: require('./routes/ls')
};

module.exports = function routerSetup(app) {
  app.get('/', routes.index);
  app.get('/home-items', routes.homeItems);
  app.get('/photo', routes.photo);
  app.get('/ls', routes.ls);
};
