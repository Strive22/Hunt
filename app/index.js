//Entry point

const React = require('react');
const ReactDOM = require('react-dom');

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

const App = require('./components/App');
// const UserHome = require('./components/UserHome');

// This is just a basic structure and some guesses at placeholders:

// ReactDOM.render((
//   <Router history={browserHistory}>
//     <Route path='/' component={App}>
//       <Route path='/users/:userid' component={UserHome} />
//       <Route path='/jobs' component={} />
//     </Route>
//   </Router>
// ), document.getElementById('app'));