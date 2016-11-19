import axios from 'axios';


exports.getUserById(userId){
  return axios.get(`/users/${userId}`).then(res => {console.log(res)})
}
