const credentials = require('./credentials.js')
const request = require('request')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const getWeather = function(coordinates) {
    const url = 'https://api.darksky.net/forecast/' + credentials.darkSkyApiKey + '/' 
                + coordinates.lat + ',' + coordinates.long + '?lang=es&units=si'

    request({ url, json: true }, function(error, response) {
        if (error) {
            console.log('error')
        } else {
            const data = response.body

            const weather = {
                summary: data.hourly.summary,
                temperature: data.currently.temperature,
                apparentTemperature: data.currently.apparentTemperature,
                rain: data.currently.precipProbability
            }
            
            console.log(weather.summary + '\n'
                        + 'La temperatura actualmente esta a ' + weather.temperature + 'C '
                        + 'y se siente a ' + weather.apparentTemperature + 'C.\n'
                        + 'Hay ' + weather.rain + '% de probabilidad de lluvia.')
        }
    })
}

const getGeocode = function(city) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
                + city + '.json?access_token=' + credentials.mapBoxApiKey

    request({ url, json: true }, function(error, response) {
        if (error) {
            console.log('error')
        } else {
            const geometry = response.body.features[0].geometry

            const coordinates = {
                long: geometry.coordinates[0],
                lat: geometry.coordinates[1]
            }

            getWeather(coordinates)
        }
    })
}

const getClimate = function() {
    readline.question("Ciudad: ", function(city) {
        getGeocode(city)
        readline.close();
      });
}

module.exports = {
    getClimate : getClimate
}


