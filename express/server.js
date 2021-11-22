// import "index.html"
const express = require('express')
const app = express()
const port = 3000;
const path = require('path')


app.get('/', (req, res) => {
  res.send('home')
})

app.get('/about', (req, res) => {
  res.send('I\'m sss Ido')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})