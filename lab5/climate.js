const credentials = require('./credentials.js')
const request = require('request')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const getWeather = function(coordinates, callback) {
    const url = 'https://api.darksky.net/forecast/' + credentials.darkSkyApiKey + '/' 
                + coordinates.lat + ',' + coordinates.long + '?lang=es&units=si'

    request({ url, json: true }, function(error, response) {
        if (error) {
            callback('Not Found', undefined)
        } else {
            const data = response.body

            if (data.error) {
                callback(data.error, undefined)
            } else {
                const weather = {
                    summary: data.hourly.summary,
                    temperature: data.currently.temperature,
                    apparentTemperature: data.currently.apparentTemperature,
                    rain: data.currently.precipProbability
                }

                callback(undefined, weather)
            }
        }
    })
}

const getGeocode = function(city, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
                 + city + '.json?access_token=' + credentials.mapBoxApiKey

    request({ url, json: true }, function(error, response) {
        if (error) {
            callback('Not Found', undefined)
        } else {
            const data = response.body

            if (data.message) {
                callback(data.message, undefined)
            } else {
                const geometry = data.features[0].geometry
                const coordinates = {
                    long: geometry.coordinates[0],
                    lat: geometry.coordinates[1]
                }
                callback(undefined, coordinates)
            }
        }
    })
}

const getClimate = function() {
    readline.question("Ciudad: ", function(city) {
        getGeocode(city, function(error, coordinates) {
            if (error) {
                console.log(error)
            } else {
                if (coordinates) {
                    getWeather(coordinates, function(error, weather) {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log(weather.summary + '\n'
                            + 'La temperatura actualmente esta a ' + weather.temperature + 'C '
                            + 'y se siente a ' + weather.apparentTemperature + 'C.\n'
                            + 'Hay ' + weather.rain + '% de probabilidad de lluvia.')
                        }
                    })
                }
            }
        })
        
        readline.close();
    });
}

getClimate()
