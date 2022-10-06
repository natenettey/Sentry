const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest:"uploads"})

const multer_controller = require('../controllers/multer_controller')
router.post('/upload',upload.single('file'),multer_controller.uploadFile)



module.exports = router