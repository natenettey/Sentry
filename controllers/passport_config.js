const bcrypt = require('bcryptjs/dist/bcrypt')
const User = require ('../models/user')
const passport = require("passport");



exports.signup_get = (req,res)=>{
    res.render('signup')
}
exports.signup_post= (req, res,next)=>{
    const message = {
        receivedMessage:false,
        text:"Passwords don't match"
    }

    //make sure all inputs have been received
    if (req.body.password!==req.body.confirm){
        res.render('signup',{
            message:message
        })
    }else if(req.body.email_address==""){
        message.text="Add an email address"
        res.render('signup',{
            message:message
        })
    }else if(req.body.username==""){
        message.text="Add a username"
        res.render('signup',{
            message:message
        })
    }else if(req.body.password==""){
        message.text="Add a password"
        res.render('signup',{
            message:message
        })
    }else if(req.body.confirm==""){
        message.text="Confirm password"
        res.render('signup',{
            message:message
        })
    }

    bcrypt.hash(req.body.password, 10, (err,hashedPassword)=>{
        //if error
        if(err){console.log(err)}

        //otherwise,store passowrd
        const user =new User({
            user_name:req.body.username,
            email:req.body.email_address,
            password:hashedPassword
        }).save(error=>{
            if(error){
                console.log("Check the error", error)
                return next(error)
            }else{
                console.log("created")
                res.redirect('/account/login')
                
            }
            
        })
    })
    

    
}

exports.login_get = (req,res)=>{
    res.render('login')
}

exports.login_post = passport.authenticate("local", {
    successRedirect: "/account/dashboard/home",
    failureRedirect: "/account/login"
  })

exports.logout = (req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect('/account/login')
    })
}