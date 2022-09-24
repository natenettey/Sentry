const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const passportRouter = require('./routes/passport_configs')


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
app.use('/forms',passportRouter)


// app.post('/signup',(req, res, next)=>{
//     console.log(req.body)
// })

app.get('/login',(req,res)=>{
    res.render('login')
})

app.listen(5000)
