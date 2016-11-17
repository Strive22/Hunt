import axios from 'axios';


exports.searchNewJobs = (searchDetails) => {
  console.log('searchNewJobs called')
  let providers = searchDetails.providers
  let keywords = searchDetails.keywords.split('').filter(letter => letter !== ' ').join('')
  return Promise.all(
    providers.map(provider =>
      axios.get(`/search/${provider}/${keywords}`)
    )
  ).then(res =>
    res.reduce((results, response) => results.concat(response.data), [])
  )
}
