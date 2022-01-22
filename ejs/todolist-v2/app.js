const express = require('express')
const app = express()

// import date
const date = require('./date.js')

// Mimic databse
let items = []
let workItems = []

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
// static
app.use(express.static('public'))


app.get('/', (req, res) => {

    const weekDays = [
        'Sunday', 
        'Monday',
        'Tuesday', 
        'Wednesday', 
        'Thursday',
        'Friday',
        'Saturday'
    ]
    res.render('index', {listTitle: 'List',date : date(), items : items})
})

app.post('/', (req, res) => {
    if (req.body.list == 'List'){
        items.push(req.body.title)
        return res.redirect('/')
    }
    workItems.push(req.body.title)
    res.redirect('/work')
})

app.get('/work', (req, res) => {
    res.render('index', {listTitle: 'Work List', date : date(), items : workItems})
})

// app.post('/work',)
app.listen(3000)

