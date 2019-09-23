const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1d47246b84760d035b4f52992e10e50f/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'?units=si'
    request ({url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to weather service', undefined)
        }else if (body.error){
            callback('Unable to find location')
        }else{
            callback(undefined,body.daily.data[0].summary + ' It is currently '+ body.currently.temperature +' degrees out. there is a '+body.currently.precipProbability+'% chance of rain')
        }
    })
    
}

module.exports = forecast