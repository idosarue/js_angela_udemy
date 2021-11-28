//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const date = require(`${__dirname}/date.js`)


app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))
app.set('view engine', 'ejs');

let listItems = []
let workItems = []
app.get('/', (req, res) => {
    res.render('list', {listTitle: date(), tasks : listItems})
})

app.post('/' , (req, res) => {
    let task = req.body.task
    console.log(req.body)
    if (req.body.list === 'Work') {
        workItems.push(task)
        res.redirect('/work')
    }else {
        listItems.push(task)
        res.redirect('/')
    }

})

app.get('/work', (req, res) => {
    res.render('list', {listTitle : 'Work List',  tasks : workItems})
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => {
    console.log('3000')
})

