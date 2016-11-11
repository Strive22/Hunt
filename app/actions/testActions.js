import { FIRST_TEST } from './actionTypes';

console.log('first test?', FIRST_TEST)

function changeTestResult(text) {
  return { type: FIRST_TEST, text }
}



export default changeTestResult;
