require('dotenv').config() //it helps you work with all environments
const mongoose = require('mongoose');


// Mongo DB conncetion
const database = 'mongodb+srv://Kachi:prac5@cluster0.udrpgld.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('MongoDB Connected Successfully!'))
.catch(err => console.log(err));