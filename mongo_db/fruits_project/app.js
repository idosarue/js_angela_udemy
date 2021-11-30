const { MongoClient } = require('mongodb');
const env = require('dotenv').config()
const mongoose = require('mongoose')


const dbPassword = process.env.DB_PASSWORD

// native driver
// const uri = `mongodb+srv://idosar:${dbPassword}@cluster0.4mmvf.mongodb.net/FruitsDataBase?retryWrites=true&w=majority`;

// const client = new MongoClient(uri);
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('FruitsDataBase');
//     const fruits = database.collection('fruits');
 
//     const fruit = await fruits.insertOne({name: 'apple', price: 1});
//     console.log(fruit);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// // mongoose
mongoose.connect("mongodb://localhost:27017/fruitsDB")

// const fruitSchema = new mongoose.Schema