//Entry point
const React = require('react');
const ReactDOM = require('react-dom');

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import changeTestResult from './actions/testActions';

const App = require('./components/App');
// const UserHome = require('./components/UserHome');

let store = createStore(rootReducer);

console.log('store.getState result:', store.getState());

store.dispatch(changeTestResult('the test passed!'));

// This is just a basic structure:

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
    </Router>
  </Provider>
), document.getElementById('app'));