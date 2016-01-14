'use strict';

const routes = {
  index: require('./routes/index'),
  homeItems: require('./routes/home-items'),
  photo: require('./routes/photo'),
  ls: require('./routes/ls'),
};

module.exports = function routerSetup(app) {
  app.get('/', routes.index);
  app.get('/api/home-items', routes.homeItems);
  app.get('/api/photo', routes.photo);
  app.get('/api/ls', routes.ls);
  app.get('*', routes.index);
};
