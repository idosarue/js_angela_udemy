const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Use the body parser to read form data
app.use(bodyParser.urlencoded({extended : true}))


app.listen(3000)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
})

app.post('/', (req, res) => {
    let requestBody = req.body

    let num1 = parseInt(req.body.num1)
    let num2 = parseInt(req.body.num2)

    let result = num1 + num2
    // res.redirect('/')
    res.send(`the result is ${result}`)
})

app.get('/bmiCalculator', (req, res) => {
    res.sendFile(`${__dirname}/static/bmiCalculator.html`)
})

app.post('/bmiCalculator', (req, res) => {
    let requestBody = req.body
    
    let weight = parseInt(requestBody.weight)
    let height = parseInt(requestBody.height)

    res.send(`Your BMI is ${weight/height**2}`)
})
