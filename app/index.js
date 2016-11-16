//Entry point
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NewSearchResults from './components/NewSearchResults'
import HomeNav from './components/HomeNav';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="home/:userid" component={Home}>
        <IndexRoute component={HomeNav}/>
        <Route path="searchResults" component={NewSearchResults}/>
      </Route>
      <Route path="/dashboard" component={Dashboard}/>
    </Route>
  </Router>
  ), document.getElementById('app')
);
