const express = require('express')
const https = require('https')
const bodyParser = require("body-parser")


const api_key = '8ec3504208eae67260850561761fa27a'


const app = express()
app.use(bodyParser.urlencoded({extended : true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post("/", (req, res) => {
    const units = 'metric'
    let city = req.body.cityName
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}`    

    https.get(weatherUrl, (response) => {    
    response.on('data' , (data) => {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        res.send(`
        <h1>The temperature in ${city} is ${temp} degrees Celcius</h1>
        <h2>The weather currently is ${weatherDescription}</h2>
        <img src='${icon}'> `)            
    })
    })
})

app.listen(3000, () => {
    console.log('listening on 3000')
})


