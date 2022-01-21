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

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
})

const fruitSchemaWithValidation = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    rating: {
        type : Number,
        min: [1, 'Must be equel or bigger than 1'],
        max : [10, 'Must be equel or less then 10']
    },
    review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema)

const FruitValidation = mongoose.model("FruitValidation", fruitSchemaWithValidation)

const fruit = new FruitValidation ({
    name : "Apple",
    rating : 10,
    review: "Solid"
})

// const banana = new Fruit ({
//     name : "banana",
//     rating : 7,
//     review: "Solid"
// })
// const kiwi = new Fruit ({
//     name : "Kiwi",
//     rating : 7,
//     review: "Solid"
// })

// const personSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// })


// const Person = mongoose.model("People", personSchema)

// const person = new Person ({
//     name : 'John',
//     age : 36
// })

//*********** Save multiple *********

// Fruit.insertMany([kiwi, banana], (err) => {
//     if (err) {
//         console.log(err)
//     }else {
//         console.log("Succesfully inserted many!")
//     }
// })

// *******save one instance**********
// person.save()
// fruit.save()

// ******Read From Database ******
// Fruit.find((err, fruits) => { // First parameter for the error, second for the objects you want to find
//     if (err){
//         console.log(err)
//     }else {
//         mongoose.connection.close()
//         console.log(...fruits.map(x => x.name))
//     }
// }) 


//******* update and delete *******/

