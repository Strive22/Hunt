var express = require('express');
var cors = require('cors');
var request = require('request')

exports.indeedHunt = function(req, res){
  request(`http://api.indeed.com/ads/apisearch?publisher=6889432854812726&format=json&q=${req.params.search}&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsed = JSON.parse(body)
      res.send(parsed);
    }
  })
}

exports.hubHunt = function(req, res){
  request(`https://jobs.github.com/positions.json?description=${req.params.search}&location=sf&full_time=true`,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsed = JSON.parse(body)
      res.send(parsed);
    }
  })
}

exports.authenticHunt = function(req, res){
  request(`https://authenticjobs.com/api/?api_key=9857c977ed97e64e61f94fc217cb612f&method=aj.jobs.search&format=json&keywords=${req.params.search}&perpage=3`,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsed = JSON.parse(body)
      res.send(parsed);
    }
  })
}