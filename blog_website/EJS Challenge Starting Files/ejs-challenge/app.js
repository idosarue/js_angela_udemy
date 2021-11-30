//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { forIn } = require("lodash");
const {check, validationResult} = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(urlencodedParser);
app.use(express.static("public"));

let posts = []

app.get('/', (req, res) => {
  res.render('home', {homeStartingContent : homeStartingContent.substring(0,50), posts : posts})
})

app.get('/post/:postId', (req, res) => {
  const postId = req.params.postId
  if (posts.length >= postId ) {
    res.render('post', {post : posts[postId], postId : postId})
  }else {
    res.redirect('/')
  }
})

app.get('/editPost/:postId', (req, res) => {
  const postId = req.params.postId
  if (posts.length >= postId ) {
    res.render('editPost', {post : posts[postId], postId : postId})
  }else {
    res.redirect('/')
  }
})


app.post('/post/:postId', urlencodedParser, [
  check('title', 'The title must be 3+ characters long').exists().isLength({min: 3}),
  check('postBody', 'The content must be 3+ characters long').exists().isLength({min: 3})
], (req, res) => {
  const errors = validationResult(req)
  const postId = req.params.postId
  let post = posts[postId]
  if (!errors.isEmpty()){
    const alert = errors.array()
    res.render('editPost', {alert, post : post, postId : postId})
  }else {
    post.title = req.body.title
    post.postBody = req.body.postBody
    res.redirect('/')
  }

})

app.delete('/deletePost/:postId', (req, res) => {
  const postId = req.params.postId
  posts.splice(postId, 1)
  res.send('okay')
})

app.get('/about', (req, res) => {
  res.render('about', {aboutStartingContent : aboutContent})
})

app.get('/contact', (req, res) => {
  res.render('contact', {contactStartingContent : contactContent})
})


app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose',urlencodedParser, [
  check('title', 'The title must be 3+ characters long').exists().isLength({min: 3}),
  check('postBody', 'The content must be 3+ characters long').exists().isLength({min: 3})
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    const alert = errors.array()
    res.render('compose', {alert})
  }else {
    let post = req.body
    posts.push(post)
    res.redirect('/')
  }
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
