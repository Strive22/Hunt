export const FIRST_TEST = 'FIRST_TEST'

export function changeTestResult(text) {
  return { type: FIRST_TEST, text }
}