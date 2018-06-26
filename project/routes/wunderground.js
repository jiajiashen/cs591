// wunderground.js is used for calling weather api and yelp fusion api


const express = require('express')
const router = express.Router()

const weatherConfig = require('../config/weather.json')
const weather = require('openweather-apis')
const yelp = require('yelp-fusion');
const client = yelp.client(weatherConfig.yelpAppKey);
weather.setAPPID(weatherConfig.appid);


router.get('/:name', function (req, res, next) {
    let str = req.params.name;
    var temp = str.split(',')
    var weatherData = null;
    var opts = {
    	city: temp[0],
    	state: temp[1]
    }
    weather.setCity(opts.city);
    weather.getAllWeather(function(err, JSONObj){
        weatherData = JSONObj;
            var food = "American";

    if(weatherData.main.temp < 15 ) {
        food = "Chinese";
    }
    else if (weatherData.main.temp < 28 && weatherData.main.temp >20){
        food = "Mexican";
    }
            client.search({
          term:  food,
  location: `${opts.city}, ${opts.state}`
}).then(response => {

    res.send({weatherData,
                    "businesses":response});
}).catch(e => {
  console.log(e);
});
    })

})


module.exports = router

