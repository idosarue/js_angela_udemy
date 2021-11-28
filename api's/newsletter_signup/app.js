const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const mailchimp = require('@mailchimp/mailchimp_marketing');
require('dotenv').config()


// mailchimp.setConfig({
//     apiKey: process.env.API_KEY,
//     server: "YOUR SERVER PREFIX e.g. us7"
//   });

const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))


app.get('/signup', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.post('/signup', (req, res) => {
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email

    const data = {
        members : [
            {
                email_address: email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)
})

app.listen(process.env.PORT)