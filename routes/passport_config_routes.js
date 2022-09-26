const express = require('express');
const router = express.Router();

// Require controller modules.
const passport_controller = require('../controllers/passport_config');

//check if is authenticated and prevent the user from accessing other urls
const checkUnauthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
       res.redirect('/account/dashboard/home')
    }
    return next()
   }

router.get('/signup',checkUnauthenticated,passport_controller.signup_get)
router.post('/signup',checkUnauthenticated,passport_controller.signup_post)
router.get('/login',checkUnauthenticated,passport_controller.login_get)
router.post('/login',checkUnauthenticated,passport_controller.login_post)
router.get('/logout',passport_controller.logout)
module.exports = router