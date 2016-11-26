import axios from 'axios';
import querystring from 'querystring';

exports.searchNewJobs = (searchDetails) => {
  // Pull the array of providers out of the details object 


  let location = searchDetails.location;
  let providers = searchDetails.providers

  // Grab the string of keywords from the details object and strip them of whitespace
    // NOTE: who's got that regex to handle this stuff? :P
  //let keywords = searchDetails.keywords.split('').filter(letter => letter !== ' ').join('')
  let keywords = searchDetails.keywords;
  // Map the providers array into an array of Promises, and wrap them in Promise.all to wait for them to finish
   
  return Promise.all(
    providers.map(provider =>
      axios.get(`/search/${provider}/${keywords}/${location}`)
    )
  ).then(res =>
    // and our .then reduces the nested arrays of response objects down into a flat array of job objects
    res.reduce((results, response) => results.concat(response.data), [])
  )
}

exports.addJob = (job, userId) => (
  axios.post(`/users/${userId}/jobs?q=interested`, querystring.stringify(job) )
)

exports.moveJobToList = (jobId, userId, list) => {
  axios.put(`/users/${userId}/jobs/${jobId}/${list}`)
}
