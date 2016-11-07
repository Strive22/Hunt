const express = require('express');
const router = express.Router();
const path = require('path');

//search the API of the user's choice for jobs
//THINK: should the three APIs be split into different endpoints?
router.get('/:api/:searchterms', (req, res) => {

})

module.exports = router;