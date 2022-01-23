const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/toDoListDB")

const itemsShema = mongoose.Schema({
    name : {
        type : String,
        required : true
    }
})

const Item = mongoose.model('Item', itemsShema)

const item1 = new Item({
    name : 's'
})

const item2 = new Item({
    name : 'THe second Item'
})

const item3 = new Item({
    name : 'THe third Item'
})

module.exports.defaultItems = [item1,item2,item3]
module.exports.item = Item
