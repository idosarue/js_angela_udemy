//jshint esversion:6
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const encryptOptions = require('./encryptOptions')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

// another way of encrypting
const md5 = require('md5')

// Bcrypt
const bcrypt = require('bcrypt')
const saltRounds = 10

// App uses
app.use(bodyParser.urlencoded({extended : true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

// Use session
app.use(session({
    secret : ""
}))

// db
mongoose.connect('mongodb://localhost:27017/secretsDB');

// Users
const User = require('./db')
// Secret Key


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
    // Bcrypt hash
    if(encryptOptions.useBcrypt){
        bcrypt.hash(password, saltRounds, (err, hash) => {
            const newUser = new User({
                email : userName,
                password : hash,
            })
            newUser.save((err) => {
                if(err) return console.log(err) 
                res.render('secrets')
            })
        })
    // md5
    }else if(encryptOptions.useMd5){
        console.log('using md5')
        const newUser = new User({
            email : userName,
            password : md5(password),
        })
        newUser.save((err) => {
            if(err) return console.log(err) 
            res.render('secrets')
        })
    // encrypt package
    }else if(encryptOptions.useEncrypt){
        console.log('using encryot')
        const newUser = new User({
            email : userName,
            password : password,
        })
        newUser.save((err) => {
            if(err) return console.log(err) 
            res.render('secrets')
        })
    }
})

app.route('/login')
.get((req, res) => {
    res.render('login')
})
.post((req, res) => {
    const requestBody = req.body
    const userName = requestBody.username
    const password = requestBody.password

    // Bcrypt hash
    if(encryptOptions.useBcrypt){
        User.findOne({email : userName}, (err, user) => {
            if(err) return console.log(err)
            if(user){
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) return console.log(err)
                    if(result) return res.render('secrets')
                    console.log('Not Found')
                })
                console.log(user)
            }
        })
    // md5
    }else if(encryptOptions.useMd5){
        console.log('using md5')
        User.findOne({email : userName}, (err, user) => {
            if(err) return console.log(err)
            if(user){
                if(err) return console.log(err)
                if(user.password === md5(password)) return res.render('secrets')
                console.log('Not Found')
            }
        })
    // encrypt package
    }else if(encryptOptions.useEncrypt){
        console.log('using encryot')
        User.findOne({email : userName, password: password}, (err, user) => {
            if(err) return console.log(err)
            if(user){
                if(err) return console.log(err)
                return res.render('secrets')
            }
        })
    }
})

app.listen(3000, () => {
    console.log("started at 3000")
})