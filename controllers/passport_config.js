const User = require ('../models/user')

exports.signup_get = (req,res)=>{
    res.render('signup')
}
exports.signup_post=(req, res)=>{
    const message = {
        receivedMessage:false,
        text:"Passwords dont match"
    }
    if (req.body.password!==req.body.confirm){
        res.render('signup',{
            message:message
        })
    }
}