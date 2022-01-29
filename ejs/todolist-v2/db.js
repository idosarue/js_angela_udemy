const mongoose = require('mongoose')
const { Schema } = mongoose;
mongoose.connect("mongodb://localhost:27017/toDoListDB")

const itemsShema = mongoose.Schema({
    name : {
        type : String,
        minLength : [5, 'The name must be at least 5 chars long'],
        validate : {
            validator : v => v.trim() != '',
            message : props => 'The name must be at least 5 chars long'
        }
    },
    list: {
        type: mongoose.Schema.Types.ObjectId, ref: 'listScehma'
    }

})

const Item = mongoose.model('Item', itemsShema)

const listSchema = mongoose.Schema({
    name : {
        type : String
    },
    items : [itemsShema]
})



const List = mongoose.model('List', listSchema)


const list1 = new List({
    name : 'Today',
})




const createDefaultItems = async(list) => {
    const defaultListName = ['The First Item', 'The Second Item', 'The Third Item']
    const createdItems = []
    for (let i = 0; i < defaultListName.length; i++) {
        console.log(i)
        const newItem = new Item({
            name : defaultListName[i],
            list : list
        })
        newItem.save()
        createdItems.push(newItem)
    }

    list.items = createdItems
    list.save()
}

module.exports.Item = Item
module.exports.List = List
module.exports.createDefaultItems = createDefaultItems
module.exports.firstList = list1

