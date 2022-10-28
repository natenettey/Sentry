const bcrypt = require('bcryptjs/dist/bcrypt')
const fileUpload = require ('../models/file')
const nodemailer = require('nodemailer')
//upload file
exports.uploadFile = async (req,res)=>{
   console.log(req.file,req.user.user_name)
   const name = req.user.email
   const cryptedPassword = await bcrypt.hash(req.body.password, 10)

   const newFile  = await new fileUpload({
      user:name,
      filePath:req.file.path,
      originalName:req.file.originalname,
      encryptedpassword:cryptedPassword,
      password:req.body.password
   }).save(error=>{
      if(error){
         console.log(error)
      }else{
      console.log("file uploaded")
      res.redirect('/account/dashboard/home')
      }
   }
   )

}

//go to password page
exports.passwordFrom = async (req,res)=>{
    res.render('password_protection')
    
    
}

//download file
exports.downloadFile = async (req,res)=>{
    try {
        var file = await fileUpload.findById(req.params.id)
        console.log(file)
    } catch (error) {
        if(error){
            console.log(error)
        }
    }
    bcrypt.compare(req.body.password, file.password, (err, result) => {
        if (result) {
          // passwords match! download file
          res.download(file.filePath, file.originalName)
        } else {
          // passwords do not match!
          res.redirect(`/files/download/${req.params.id}`)
        }
      })
   
}

//send mail
exports.sendMail = (req,res)=>{

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });

      let mailOptions = {
        from: 'techdify.mail@gmail.com',
        to: 'niibobby4@gmail.com', 
        subject: 'Nodemailer Project',
        text: 'Hi from your nodemailer project'
      };

      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });

      res.send("done")
}

exports.populateMailForm =async (req,res)=>{
  console.log("path",req.body.key)
  await fileUpload.findById(req.body.key).then(
    data=>{
      console.log(data)
      res.json({path:data})
    }
  )

    
 
  
}