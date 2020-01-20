const req = require('request')

const geocode = (address,callback)=>{
    const urll = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ3VuYWRpZ3VuYSIsImEiOiJjazVnZ29nc2cwN3NxM25rcWUyanJwb3VlIn0.dBVAqAt4_SfxIixbe_nHMg&limit=1'

    req({ url: urll, json: true }, (error, {body}) => {

        if (error) {
            callback('unable to connect',undefined)
        }
        else if (body.features.length === 0) {
            callback('unable to find location',undefined)
        } else {
            const value = body
    
            callback(undefined,{
                latitude : value.features[0].center[1],
                longitude : value.features[0].center[0],
                location : value.features[0].place_name
            })    
        }  
    })

 }

 module.exports = geocode 