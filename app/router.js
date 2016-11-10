import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Overall app
import App from './App';

// Layouts
import Dashboard from './components/layouts/Dashboard';
import Connect from './components/layouts/Connect';
import EditProfile from './components/layouts/EditProfile';

// Containers
import HomeContainer from './components/containers/HomeContainer';
import HomeNavContainer from './components/containers/HomeNavContainer';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={HomeContainer}>
        <IndexRoute component={HomeNavContainer} />
        {/* <Route component={JobListContainer} /> */}
      </Route>

    </Route>
  </Router>
);
