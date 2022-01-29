const { process_params } = require('express/lib/router');
const mongoose = require('mongoose')
const { Schema } = mongoose;
mongoose.connect("mongodb://localhost:27017/blogDB")

const postsSchema = mongoose.Schema({
    title : {
        type: String,
        minLength : [10 , 'The title must be at least 10 chars long'],
        validator : {
            validate : value => value.trim() != '',
            message : 'The title must be at least 10 chars long'
        }
    },
    content : {
        type: String,
        minLength : [10 , 'The content must be at least 10 chars long'],
        validator : {
            validate : value => value.trim() != '',
            message : props => props.value + 'The must be at least 10 chars long'
        }
    }
})

const Post = mongoose.model('Post', postsSchema)

module.exports = Post