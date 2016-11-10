const express = require('express');
const router = express.Router();
const path = require('path');
const model = require('./models/search_models.js')


//search the API of the user's choice for jobs

//github
router.get('/gh/:search', model.hubHunt)

//authentic jobs
router.get('/aj/:search', model.authenticHunt)

//indeed
router.get('/in/:search', model.indeedHunt)



module.exports = router;