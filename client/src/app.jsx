import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import history from './app-history';
import routerConfig from './router-config';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(<Router history={history} routes={routerConfig} />, document.getElementById('app'));
