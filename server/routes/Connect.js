const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');
const db = require('../config/db');
const User = require('../models/users');



router.get('/:zipcode/:distance', (req, res) => {

  let zip = req.params.zipcode;
  let tech = req.params.technology;
  let distance = req.params.distance;

  let options = {
    url: `https://www.zipcodeapi.com/rest/ziIVUJdcmcwd75mQj678WcCpZMBTyGU7YD3Smh5ItCWAHir1py9lKMLJymC62xe1/radius.json/${zip}/${distance}/mile`,
    json: true
  };

  function getZipCode(err, response, body) {

    if (!err && response.statusCode == 200) {
      let zipcode = body.zip_codes.map(zip => {
        return zip.zip_code;
      });
      User.find({$and: [{location: { $in: zipcode }}, {otherHunters: true}]}, (err, user) => {
        res.send(user);
      });
    } else {
      console.log('Bad request to Zipcode service');
    }
  }
  request(options, getZipCode);

});



module.exports = router;
