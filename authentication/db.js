const mongoose = require('mongoose')
// one way
const encrypt = require('mongoose-encryption')
const encryptOptions = require('./encryptOptions')


require('dotenv').config()
const secret = process.env.SECRET

const userSchema = mongoose.Schema({
    email: String,
    password : String
})

if(encryptOptions.useEncrypt){
    userSchema.plugin(encrypt, {secret : secret, encryptedFields : ['password']})
}

const User = mongoose.model('User', userSchema)

module.exports = User