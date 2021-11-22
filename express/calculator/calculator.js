// import "index.html"
const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require("body-parser")
const { body,validationResult } = require('express-validator');

// body('name', 'Empty name').trim().isLength({ min: 1 }).escape(),

app.use(bodyParser.urlencoded({extended : true}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/static/index.html")
})

app.post('/', (req, res) => {
    // res.send("thanks")
    let num1 = parseInt(req.body.num1)
    let num2 = parseInt(req.body.num2)
    // body('num1', 'Invalid age').optional({ checkFalsy: true }).isNumeric(),
    console.log(num1 + num2)
  })
  

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })