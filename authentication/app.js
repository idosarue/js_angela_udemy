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
require('dotenv').config()
const secret = process.env.SECRET

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
    secret : secret,
    resave : true,
    saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())

// db
mongoose.connect('mongodb://localhost:27017/secretsDB');

// Users
let User;

const userSchema = mongoose.Schema({
    email: String,
    password : String
})

if(encryptOptions.usePassport){
    userSchema.plugin(passportLocalMongoose)
    User = mongoose.model('User', userSchema)
    passport.use(User.createStrategy())
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
}else if(encryptOptions.useEncrypt){
    userSchema.plugin(encrypt, {secret : secret, encryptedFields : ['password']})
    User = mongoose.model('User', userSchema)
}

app.get('/', (req, res) => {
    res.render('home')
})

app.route('/register')
.get((req, res) => {
    res.render('register')
})
.post((req, res, next) => {
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
    // passport
    }else if(encryptOptions.usePassport){
        User.register({username : userName}, password, (err, user) => {
            if(err){
                console.log(err, 107)
                return res.render('register' , {error : err, userName : userName})
            } 
            passport.authenticate("local", (req, res) => {
                req.login(user, (err) => {
                    if(err){
                        return console.log(err, 112)
                    }
                    res.redirect('/secrets')
                })
            })

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
                return res.redirect('/secrets')
            }else {
                console.log('nope')
            }
        })
    // passport
    }else if (encryptOptions.usePassport) {
        User.findOne({email : userName}, (err, user) => {
            if(err) return console.log(err)
            if(user){
                if(err) return console.log(err)
                if(user.password === md5(password)) return res.render('secrets')
                console.log('Not Found')
            }
        })
    }
})

app.route('/secrets') 
.get((req, res) => {
    res.render('secrets')
})

app.listen(3000, () => {
    console.log("started at 3000")
})