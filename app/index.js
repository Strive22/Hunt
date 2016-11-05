//Entry point
const React = require('react');
const ReactDOM = require('react-dom');

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

const App = require('./components/App');
// const UserHome = require('./components/UserHome');

// This is just a basic structure:

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
    </Route>
  </Router>
), document.getElementById('app'));