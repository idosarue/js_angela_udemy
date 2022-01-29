const express = require('express')
const app = express()
const _ = require('lodash')

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
// Add delete method
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
// Objects
const List = require('./db.js').List
// const defaultItems = require('./db.js').defaultItems
const Item = require('./db.js').Item
const firstList = require('./db.js').firstList
const createDefaultItems = require('./db').createDefaultItems


// console
const log = console.log.bind(console, 'app')

app.get('/', (req, res) => {

    let defaultList;
    const weekDays = [
        'Sunday', 
        'Monday',
        'Tuesday', 
        'Wednesday', 
        'Thursday',
        'Friday',
        'Saturday'
    ]

    Item.find({}, (err, items) => {
        if(!err){
            if(items.length == 0){
                createDefaultItems(firstList)
            }
        }
    List.findOne({name: 'Today'}, (err, foundList) => {
        if(!err){
            if(foundList){
                res.render('index', {listTitle: foundList.name, date : date(), items : foundList.items})
            }
        }
    })


})

})



app.post('/', (req, res) => {
    const errors = []
    const title = req.body.itemTitle
    const listName = req.body.listName

    List.findOne({name : listName} , async(err, foundList) => {
        if(!err){
            if(foundList){
                try {
                    const newItem = new Item({
                        name : title,
                        list : foundList
                    })
                    await newItem.save()
                    foundList.items.push(newItem)
                    foundList.save()
                }catch (error){
                   return res.render('index', {listTitle: foundList.name, date : date(), items : foundList.items, errorMessage : error.errors['name'].message})
                }
 
                if(foundList.name == 'Today'){
                    return res.redirect('/')
                }
                res.redirect(`/${listName}`)
            }
        }
    })
    
})

app.get('/:listName', (req, res) => {
    let listName = _.capitalize(req.params.listName)
    if(listName == 'favicon.ico'){
        listName == 'Today'
    }
    List.findOne({name : listName} , (err, foundList) => {
        if(!err){
            if(!foundList) {
                const newList = new List({
                    name : listName,
                })
                createDefaultItems(newList)

                return res.render('index', {listTitle: newList.name ,date : date(), items : newList.items})
            }

            return res.render('index', {listTitle: foundList.name ,date : date(), items : foundList.items})

        }
    })
})

app.delete('/deleteItem', (req, res) => {
    const checkBox = req.body.checkbox
    if (checkBox != null){
        Item.findById(checkBox, (err, item) => {
            if(!err){
                List.findByIdAndUpdate(item.list, {$pull : {items : {_id : checkBox}}}, (err, list) => {
                    if(!err){
                        if(list.name != 'Today'){
                            return res.redirect(`/${list.name}`)
                        }
                        return res.redirect('/')
                    }
                })

            }
        })
    }

})

app.listen(3000)

