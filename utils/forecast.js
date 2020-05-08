const request = require('request')

const forecast = (latitude,longitude,location,callback) =>{
    url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=163c37716ee55583e5aaadf0796f0d8b`
    request({url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to the Internet(The World).",undefined)
        } else if (response.body.message) {
            callback("Unable to find Location(in the World).",undefined)
        } else {
            forecastupdate = response.body.weather[0].description
            temperature = response.body.main.temp
             callback(undefined, { latitude, longitude, location,temperature, forecastupdate })
        }
    })
}


module.exports = forecast