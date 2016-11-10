// import { combineReducers } from 'redux';
import { FIRST_TEST } from '../actions/testActions';

//For now, all reducers will be in this file.  Later on, we can split them into their own files as appropriate for features

const initialState = {
  test: "the test failed."
};

function rootReducer(state = initialState, action) {
  if (action.type === "FIRST_TEST") {
    return Object.assign({}, state, {
      test: action.text
    })
  }
  return state;
}

// let rootReducer = combineReducers({})

export default rootReducer;