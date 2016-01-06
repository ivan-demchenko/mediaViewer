import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import Common from './common/common'
import Home from './home/home'
import About from './about/about'
import NoMatch from './no-match/no-match'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

render((
  <Router history={browserHistory}>
    <Route path="/" component={Common}>
      <IndexRoute component={Home} />
      <Route path="about" component={About}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('app'))
