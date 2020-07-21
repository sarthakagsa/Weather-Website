const request = require('request')

const forecast = (latitude , longitude , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=269d48637f410816a853ef778981b36e&query='+latitude+','+longitude+''

    request({ url,json : true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if(body.error) {
            callback('Unable to find location',undefined);
        } else{
            callback(undefined,body.current.weather_descriptions[0]+'.It is cureently '+body.current.temperature+' degree.It feels like '+body.current.feelslike+' degrees.');
        }
    } )
}

module.exports = forecast