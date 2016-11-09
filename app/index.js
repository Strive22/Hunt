//Entry point
const React = require('react');
const ReactDOM = require('react-dom');

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// import { createStore } from 'redux';

const App = require('./components/App');
// const UserHome = require('./components/UserHome');

// let store = createStore();

// This is just a basic structure:

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='*' component={App} />
    </Router>
), document.getElementById('app'));