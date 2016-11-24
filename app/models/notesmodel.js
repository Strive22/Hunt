import axios from 'axios'; 

exports.getNotes = (user, job) => axios.get(`/users/${user}/${job}`).then(res => res.data )