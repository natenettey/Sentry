const bcrypt = require('bcryptjs/dist/bcrypt')
const fileUpload = require ('../models/file')

//upload file
exports.uploadFile = async (req,res)=>{
   console.log(req.file,req.user.user_name)
   const name = req.user.email
   const cryptedPassword = await bcrypt.hash(req.body.password, 10)

   const newFile  = await new fileUpload({
      user:name,
      filePath:req.file.path,
      originalName:req.file.originalname,
      password:cryptedPassword
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
