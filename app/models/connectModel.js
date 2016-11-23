import axios from 'axios';


exports.getNearbyUsers = (dist, zip, technology) => {
  return axios.get(`/connect/${zip}/${dist}`)
    .then((response) => response.data)
    .then(users => {

      if (technology) {
        return users.filter((user) => user.tech.includes(technology))
      } else {
        return users
      }
    })
    .catch(err => {
      console.log('I\'m Sorry, something went wrong', err.message)
    })
}
