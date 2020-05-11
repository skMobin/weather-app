const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./../utils/forecast')
const geocoding = require('./../utils/gecoding')

const app = express()
const port = process.env.PORT || 3000
//config path for express
const pathDirectory = path.join(__dirname,'../templates')
const viewpaths = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

app.set("view engine", 'hbs');
app.set('views',viewpaths);
hbs.registerPartials(partialpath);

app.use(express.static(pathDirectory))

app.get('',(req, res)=>{
    res.render("index", { title: 'Weather', name: "sk Mobin"})
})

app.get('/help', (req, res) => {
    res.render('help',{title : "Help" ,name:"sk Mobin"})
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About", name: "sk Mobin"})
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: "You must provide an Address"
        })
    }
    geocoding(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, data.location, (error, fdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: fdata.forecastupdate,
                address: req.query.address,
                location: fdata.location,
            })
        })
    })
})
   

app.get('/help*',(req,res)=>{
    res.render("404",{title:"Help 404",content : "404 help page not found"})
})

app.get('*', (req, res) => {
    res.render("404", { title: "404 page not found", content: "404 page not found" })
})

app.listen(port,()=>{
    console.log("server is running!!")
})