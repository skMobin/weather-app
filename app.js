const geocoding = require("./utils/gecoding")
const forecast = require("./utils/forecast")
const address = process.argv[2]

if(!address){
    console.log("Please provide Address!!!!")
}else{
    geocoding(address, (error, data) => {
        if (error) {
            return console.log(error)
        }
        forecast(data.latitude, data.longitude, data.location, (error, fdata) => {
            if (error) {
                return console.log("Error" + error)
            }
            console.log("Location : " + fdata.location)
            console.log("Weather is "+fdata.forecastupdate)     
            // console.log("Temperature is "+ fdata.temperature)
        })
    })

}



