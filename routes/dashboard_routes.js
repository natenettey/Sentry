const express = require('express');
const router = express.Router();

// Require controller modules.
const dashboard_controller = require('../controllers/dashboard_controller');
const checkAunthenticated = (req,res,next)=>{
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/account/login')
}


router.get('/home',checkAunthenticated ,dashboard_controller.getdashboard)




module.exports = router