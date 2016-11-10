//Entry point
const React = require('react');
const ReactDOM = require('react-dom');

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import changeTestResult from './actions/testActions';

const App = require('./components/App');
const Land = require('./components/Landingpage');
const Hunt = require('./components/Hunt');
const Dash = require('./components/ViewDashBoard');
const search = require('./components/SearchForJob');
// const UserHome = require('./components/UserHome');

let store = createStore(rootReducer);

console.log('store.getState result:', store.getState());

store.dispatch(changeTestResult('the test passed!'));

console.log('store.getState new result:', store.getState());


// This is just a basic structure:

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path ='Land' component ={Land}/>
      <Route path ='Dash' component ={Dash}/>
      <Route path ='search' component ={search}/>
    </Router>
  </Provider>
), document.getElementById('app'));