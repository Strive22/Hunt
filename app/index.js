//Entry point
const React = require('react');
const ReactDOM = require('react-dom');

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// import { createStore } from 'redux';

const App = require('./components/App');
const Land = require('./components/Landingpage');
const Hunt = require('./components/Hunt');
const Dash = require('./components/ViewDashBoard');
const search = require('./components/SearchForJob');
// const UserHome = require('./components/UserHome');

// let store = createStore();

// This is just a basic structure:

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={Hunt}>
      <IndexRoute component ={Land}/>
      <Route path ='Land' component ={Land}/>
      <Route path ='Dash' component ={Dash}/>
      <Route path ='search' component ={search}/>
      </Route>
    </Router>
), document.getElementById('app'));