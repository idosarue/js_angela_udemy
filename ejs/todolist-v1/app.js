//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const date = require(`${__dirname}/date.js`)
const {check, validationResult} = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

let listItems = []
let workItems = []
app.get('/', (req, res) => {
    res.render('list', {listTitle: date.getDate(), tasks : listItems})
})

app.post('/' , urlencodedParser, [
    check('task', 'Must be 3+ characters long')
    .exists().isLength({min: 3})
], (req, res) => {
    let task = req.body.task
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        const alert = errors.array()
        res.render('list', {
            alert, listTitle : date.getDate(),  tasks : listItems
        })
    }else {
        listItems.push(task)
        res.redirect('/')
    }

})

app.post('/work' , urlencodedParser, [
    check('task', 'Must be 3+ characters long')
    .exists().isLength({min: 3})
], (req, res) => {
    let task = req.body.task
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        const alert = errors.array()
        res.render('work', {
            alert, listTitle : 'Work List',  tasks : workItems
        })
    }else {
        workItems.push(task)
        res.redirect('/work')
    }

})

app.get('/work', (req, res) => {
    res.render('work', {listTitle : 'Work List',  tasks : workItems})
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => {
    console.log('3000')
})

