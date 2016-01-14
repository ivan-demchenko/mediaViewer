import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import streams from './streams';
import history from './history';

import Common from './common';
import Listing from './listing';
import Home from './home';
import About from './about';
import NoMatch from './no-match';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render((
  <Router history={history}>
    <Route path="/" component={Common}>
      <IndexRoute component={Home} />
      <Route path="/ls" component={Listing} />
      <Route path="/about" component={About} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
), document.getElementById('app'));
