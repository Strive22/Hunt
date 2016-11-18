import axios from 'axios';


exports.searchNewJobs = (searchDetails) => {
  // Pull the array of providers out of the details object
  let providers = searchDetails.providers

  // Grab the string of keywords from the details object and strip them of whitespace
    // NOTE: who's got that regex to handle this stuff? :P
  let keywords = searchDetails.keywords.split('').filter(letter => letter !== ' ').join('')

  // Map the providers array into an array of Promises, and wrap them in Promise.all to wait for them to finish
  return Promise.all(
    providers.map(provider =>
      axios.get(`/search/${provider}/${keywords}`)
    )
  ).then(res =>
    // and our .then reduces the nested arrays of response objects down into a flat array of job objects
    res.reduce((results, response) => results.concat(response.data), [])
  )
}

exports.addJob = (jobDetails) => {
  return axios.post(`http://localhost:3000/users/${this.state.currentUser._id}/jobs?q=interested`, querystring.stringify({
        api: jobData.api,
        apiSpecificId: jobData.apiSpecificId,
        title: jobData.title,
        company: jobData.company,
        location: jobData.location,
        link: jobData.link,
        description: description
    })
  ).then(res => {
    console.log(res)
    return res
  })
}
