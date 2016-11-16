//Entry point
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/home/:userid" component={Home}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Route>
  </Router>
  ), document.getElementById('app')
);
