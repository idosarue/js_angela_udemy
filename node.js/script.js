//jshint esversion:6

const fs = require('fs')

// copy files
fs.copyFileSync('text1.txt', 'text2.txt')

// superheroes api
const superheroes = require('superheroes');
console.log(superheroes.random())