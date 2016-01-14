import Common from './common';
import Listing from './listing';
import Home from './home';
import About from './about';
import NoMatch from './no-match';
import Service from './service';

export default [
  { path: '/',
    component: Common,
    indexRoute: { component: Home },
    childRoutes: [
      {
        path: 'ls',
        component: Listing,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: '*',
        component: NoMatch,
      },
    ],
  },
];
