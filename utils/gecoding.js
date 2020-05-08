const request = require('request')
const geocoding = (Adress, callback) => {
    const GeoCodeURL = `http://api.mapbox.com/geocoding/v5/mapbox.places/=${encodeURIComponent(Adress)}.json?access_token=pk.eyJ1Ijoic2ttb2JpbiIsImEiOiJjazl4Mm5hZmwwZXhnM2xxc20yb3Zlbmt5In0.9iT3ayCQGVKmhfz38VhJGg&limit=1`
    request({ url: GeoCodeURL, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the Internet(The World).", undefined)
        } else if (response.body.features == 0) {
            callback("Unable to find Location(in the World).", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })


        }
    })
} 

module.exports = geocoding