import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Overall app
import App from './App';

// Layouts
import Dashboard from './components/layouts/Dashboard';
// import Connect from './components/layouts/Connect';
import EditProfile from './components/layouts/EditProfile';

// Containers
import HomeContainer from './components/containers/HomeContainer'; 

import Connect from './components/ConnectContainer';



export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={HomeContainer}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/connect" component={Connect}/>
      <Route path="/edit" component={EditProfile}/>
    </Route>
  </Router>
);
