//Entry point
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import changeTestResult from './actions/testActions';

import router from './router.js'


let store = createStore(rootReducer);

console.log('before dispatch:', store.getState())

store.dispatch(changeTestResult('the test passed!'));

console.log('after dispatch:', store.getState())


// This is just a basic structure:

ReactDOM.render((
  <Provider store={store}>{router}</Provider>
), document.getElementById('app'));
