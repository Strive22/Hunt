import axios from 'axios';

exports.getUserById = (userId) => axios.get(`/users/${userId}`).then(res => res.data )
