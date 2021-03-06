const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setuo handlebars engine and viwes location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name : 'Sarthak Agarwal'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help ',
        name : 'Sarthak Agarwal'
    })
})


app.get('',(req,res) => {
     res.render('index',{ 
        title : 'Weather App',
        name : 'Sarthak Agarwal'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error : 'You must provide an address!'})
    }

    geocode(req.query.address, (error,{latitude,longitude,location } = {})=> {
        if (error) {
            return res.send({
                error ,//using short hand
            })
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if (error) {
                return res.send({
                    error , //using shorthand
                })
            }            
            res.send({
                location,
                forecast : forecastData,
                address  : req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title : '404' ,
        name : 'Sarthak Agarwal',
        errormessage : 'Help article not found'
    })
} )

app.get('*', (req,res) => {
    res.render('404', {
        errormessage : 'Page not found',
        title : '404' ,
        name : 'Sarthak Agarwal'
    })
} )

app.listen(port, () =>{
    console.log('Server is up on port' +port);
} )