const bcrypt = require('bcryptjs/dist/bcrypt')
const fileUpload = require ('../models/file')


exports.uploadFile = async (req,res)=>{
   console.log(req.file,req.user.user_name)
   const name = req.user.email
   const newFile  = await new fileUpload({
      user:name,
      filePath:req.file.path,
      originalName:req.file.originalname
   }).save(error=>{
      if(error){
         console.log(error)
      }else{
      console.log("file uploaded")
      res.redirect('/account/dashboard/home')
      }
   }
   )
//    const filePath  = `${request.headers.origin}/file/${newFile.id}`
   
}

exports.downloadFile = (req,res)=>{
    try {
        const file = fileUpload.findById(req.params.id)
        console.log(file)
    } catch (error) {
        if(error){
            console.log(error)
        }
    }
    
}
