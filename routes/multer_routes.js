const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest:"uploads"})

const multer_controller = require('../controllers/multer_controller')
router.post('/upload',upload.single('file'),multer_controller.uploadFile)
router.get('/download/:id',multer_controller.passwordFrom)
router.post('/download/:id',multer_controller.downloadFile)


module.exports = router