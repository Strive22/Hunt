const FIRST_TEST = 'FIRST_TEST'

function changeTestResult(text) {
  console.log('changeTestResult catching')
  return { type: FIRST_TEST, text }
}

export default changeTestResult;