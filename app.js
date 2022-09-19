const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()


//db connection
const mongoose =require('mongoose')
const mongoDB=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sandbox.p5qetim.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoDB,{ useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
    res.render('signup')
})


app.listen(5000)
