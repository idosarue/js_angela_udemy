const express = require('express')
const app = express()
const {check, validationResult} = require('express-validator')
const methodOverride = require('method-override')
// import date
const date = require('./date.js')

// databse
const Item = require('./db.js').item
const defaultItems = require('./db.js').defaultItems


app.set('view engine', 'ejs')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
// static
app.use(express.static('public'))
// method ovveride
app.use(methodOverride('_method'))

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

    Item.find((err, items)=>{
        if (items.length == 0){
            Item.insertMany(defaultItems, (err) => {
                if (err) return handleError(err)
            })
        } 
        res.render('index', {listTitle: 'List',date : date(), items : items})
    })
    
})

app.post('/', 
// check('title', 'The title Must be at least 5 chars long').exists().isLength({min:5}).isAlphanumeric(),
(req, res) => {
    // const errors = validationResult(req)
    const errors = []
    // if (!errors.isEmpty()){
    //     console.log(errors.array())
    //     return Item.find((err, items)=>{
    //         res.render('index', {listTitle: 'List',date : date(), items : items, errors : errors.array()})
    //     })
    // }
    const title = req.body.title
    const existingItems = Item.find({name : title}, (err, items) => {
        if (err) return handleError(err)
        return items
    })

    if (title.length < 5 || title.trim() == '' ) {
        errors.push({msg : 'Must Be at least 5 chars long'})
    }else if (existingItems.length > 0) {
        errors.push({msg : 'Task exists'})
    }

    if (errors.length > 0){
        return Item.find((err, items) => {
            if (err) return handleError(err)
            res.render('index', {listTitle: 'List',date : date(), items : items, errors : errors})
        })
    }

    const item = new Item({
        name : title
    }) 

    item.save()
    res.redirect('/')
})

app.get('/work', (req, res) => {
    res.render('index', {listTitle: 'Work List', date : date(), items : workItems})
})

app.delete('/deleteItem/:id', (req, res) => {
    // console.log(req.params.id, '88')
    // Item.find({id : req.params.id},(err, items) => {
    //     if (err) return handleError(err)
    // })
    Item.deleteOne({id : req.params.id}, (err) => {
        if (err) return handleError(err)
    })

    res.redirect('/')
})

app.listen(3000)

