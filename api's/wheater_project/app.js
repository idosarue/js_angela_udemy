// env
require('dotenv').config()
const process = require('process')
const env = process.env

// Reauire express
const express = require('express')
// Initialize the app
const app = express()
// Require Body Parser to read request data
const bodyParser = require('body-parser')
// Use the body-parser
app.use(bodyParser.urlencoded({extended : true}))
// Port
app.listen(env.PORT)
// Make https requests
const https = require('https')

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`)
})


app.post('/', (req, res) => {
    const requestBody = req.body
    let city = requestBody.city
    let units = requestBody.units

    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${env.API_KEY}&units=${units}`, (response) => {
        response.on('data', (d) => {
            let jsonResponse = JSON.parse(d)
            try {
                let icon = `https://openweathermap.org/img/wn/${jsonResponse.weather[0].icon}@2x.png`
                res.send(`The temperature in ${city} is ${jsonResponse.main.temp} <img src='${icon}'>`)
            } catch (error) {
                res.send(jsonResponse.message)
            }
        })
    })
})

