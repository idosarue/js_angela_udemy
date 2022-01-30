//jshint esversion:6
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')


app.use(bodyParser.urlencoded({extended : true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))


// Users
const User = require('./db')

app.get('/', (req, res) => {
    res.render('home')
})



app.route('/register')
.get((req, res) => {
    res.render('register')
})
.post((req, res) => {
    const requestBody = req.body
    const userName = requestBody.username
    const password = requestBody.password
    
    const newUser = new User({
        email : userName,
        password : password,
    })

    newUser.save((err) => {
        if(err) return console.log(err) 
        res.render('secrets')
    })
})

app.route('/login')
.get((req, res) => {
    res.render('login')
})
.post((req, res) => {
    const requestBody = req.body
    const userName = requestBody.username
    const password = requestBody.password
    User.findOne({email : userName, password : password}, (err, user) => {
        if(err) return console.log(err)
        if(user){
            console.log(user)
        }
    })
})

app.listen(3000, () => {
    console.log("started at 3000")
})