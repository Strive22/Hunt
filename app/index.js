//Entry point
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

const App = require('./components/App');
const Home = require('./components/Home');


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path = "/" component={App}>
      <Route path="users/:userid" component={Home}/>      
    </Route>
  </Router>
), document.getElementById('app'));
