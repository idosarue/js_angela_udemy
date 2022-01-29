const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')

// Articles from db
const Article = require('./db')
const { concatSeries } = require('async')
const { set } = require('mongoose')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static('public'))


app.route('/articles')
    .get(async(req, res) => {
    const articles = await Article.find()
    if (articles.length == 0){
        return res.sendStatus(404)
    }
    res.send(articles)
    })
    .post((req, res) => {
        console.log(req.body)
        console.log(req.body.title)
        console.log(req.body.content)
        const newArticle = new Article({
            title : req.body.title,
            content : req.body.content,
        })

        newArticle.save()

        res.redirect('/articles')
    })
    .delete((req, res) => {
        Article.deleteMany({}, (err, articels) => {
            if(!err){
                return res.send (`deleted ${articels.deletedCount} articles`)
            }
            res.send(err)
    })
})

app.route('/articles/:articleTitle')
.get(async(req, res) => {
    const foundArticle = await Article.findOne({title : req.params.articleTitle})
    res.send(foundArticle)
})
.put(async(req, res) => {
    const updatedArticle = await Article.findOneAndUpdate({title : req.params.articleTitle}, {title : req.body.title}, {overwrite : true})
    console.log(updatedArticle)
    updatedArticle ? res.send(updatedArticle) : res.sendStatus(404)
})
.patch(async(req, res) => {
    const updatedArticle = await Article.findOneAndUpdate({title : req.params.articleTitle}, {$set : req.body})
    updatedArticle ? res.send(updatedArticle) : res.sendStatus(404)
})
.delete((req, res) => {
    Article.deleteOne({title : req.params.articleTitle}, (err, article) => {
        if(err) return res.send(err)
        res.send(`deleted ${article.deletedCount} articles`)
    })
})

app.listen(3000)