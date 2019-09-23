const path = require('path')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')



const app = express()
cosnt port = process.env.PORT || 3000
//define paths for express config

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Rolf John Siason'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About Me',
        name:'Rolf John Siason'
    })
})


app.get('/help',(req, res)=>{
    res.render('help', {
        helptext: 'This is some helpful text',
        title: 'Help',
        name: 'Rolf John Siason'
    })
})
app.get('/render', (req, res)=>{
    res.send('render page')
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if (error) {
           return res.send({
               error
           })
        }
     
        forecast(latitude, longitude, (error, forecastData) => {
           if (error){
              return res.send({
                  error
              }) 
           }
           res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
            })
         })
     })


})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search item'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help 404',
        name: 'Rolf John Siason',
        errorMsg: 'Help article not Found.'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Rolf John Siason',
        errorMsg: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up for port ' +port)
})

