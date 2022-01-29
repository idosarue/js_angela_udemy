const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/wikiDB')

const articleSchema = mongoose.Schema({
    title : String,
    content : String
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article