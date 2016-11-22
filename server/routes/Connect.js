const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request');
const db = require('../config/db');
const User = require('../models/users');
  


router.get(`/:Zipcode/:Distance`, (req, res) => { 
   console.log('here indddd side',req.params.Zipcode);
   let zip = req.params.Zipcode;  
   let Tech = req.params.Technology;
   let Distance = req.params.Distance;
   console.log("Technology!!!!!!!!", Tech);
    let options = {
      url: `https://www.zipcodeapi.com/rest/9PX7WZN8v7wh0xuIQMJfd6KOnMquE41NTYVPXJYsRuKR1eAS1k7eqS2NFthkxi8q/radius.json/${zip}/${Distance}/mile`,
       json: true
       }

  function getZipCode(err, response, body) {
      if (!err && response.statusCode == 200) {
      let Zipcode = body.zip_codes.map(zip => {
        return zip.zip_code;
      })
       console.log("bodyyyyyyy", Zipcode);
        User.find({$and:[{location: { $in: Zipcode }},{otherHunters:true}]},(err, user) => { 
          console.log("helloo User", user); 
          res.send(user);
        })
      } 
     else{
       console.log("helloooo bad requestttt");
      }
      }
    request(options, getZipCode);
 
})



module.exports = router;