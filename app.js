const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const passportRouter = require('./routes/passport_config_routes')
const dashboardRouter = require('./routes/dashboard_routes')
const multerRouter = require('./routes/multer_routes')
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require ('./models/user')
const bcrypt = require('bcryptjs/dist/bcrypt')
const nocache = require("nocache")




//db connection
const mongoose =require('mongoose')
const mongoDB=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sandbox.p5qetim.mongodb.net/sentry?retryWrites=true&w=majority`
mongoose.connect(mongoDB,{ useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(nocache())
app.use(passport.session());

app.use('/account',passportRouter)
app.use('/account/dashboard',dashboardRouter)
app.use('/files',multerRouter)

//use LocalStrategy to check if user is registered
passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ user_name: username }, (err, user) => {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, { message: "Incorrect password" })
            }
          })
        // return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  app.use(passport.initialize())
  

app.listen(5000)
