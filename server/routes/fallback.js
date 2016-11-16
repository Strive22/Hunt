const express = require('express');
const router = express.Router();
const path = require('path');

//Catch-all route - MUST BE AT END - to handle unexpected use cases in React Router
//Will serve the index.html file if another file is not found on the server
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/app.html'))
});

module.exports = router;