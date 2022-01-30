const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/secretsDB');

const userSchema = mongoose.Schema({
    email: String,
    password : String
})

const User = mongoose.model('User', userSchema)

module.exports = User