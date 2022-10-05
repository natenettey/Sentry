const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest:"uploads"})

// Require controller modules.
const dashboard_controller = require('../controllers/dashboard_controller');
const checkAunthenticated = (req,res,next)=>{
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/account/login')
}


router.get('/home',checkAunthenticated ,dashboard_controller.getdashboard)
router.post('/upload',upload.single('file'),dashboard_controller.uploadFile)





module.exports = router