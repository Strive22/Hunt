import { FIRST_TEST } from './actionTypes';

function changeTestResult(text) {
  return { type: FIRST_TEST, text }
}

export default changeTestResult;
