const req = require('request')

const forecast = (lat,lng,callback)=>{
    
const url = 'https://api.darksky.net/forecast/b1364cbabd675fa262acfd046fafa96f/'+encodeURIComponent(lat)+','+encodeURIComponent(lng)+'?units=si&lang=id'

req({ url, json: true }, (error, {body}) => {

   if (error) {
/    //    console.log(error)
       callback('unable to connect',undefined)
   }
   else if (body.error) {
       callback('unable to find location ' + body.error,undefined)
   } else {
       const value = body
       const info = value.currently
        
       callback(undefined, value.timezone + '\n' + value.daily.data[0].summary + ' dengan temperatur ' + info.temperature + " derajat, prakiraan hujan " + info.precipProbability + " % ")

 //      console.log(value.timezone + '\n' + value.daily.data[0].summary + ' dengan temperatur ' + info.temperature + " derajat, prakiraan hujan " + info.precipProbability + " % ")

   }
})

}


module.exports = forecast 