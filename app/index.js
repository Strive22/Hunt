//Entry point
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NewSearchResults from './components/NewSearchResults'
import Profile from './components/EditProfile';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/edit" component={Profile}/>
      <Route path="/home/:userid" component={Home}/>
      <Route path="/searchResults" component={NewSearchResults}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Route>
  </Router>
  ), document.getElementById('app')
);
