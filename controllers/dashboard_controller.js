const bcrypt = require('bcryptjs/dist/bcrypt')
const files = require ('../models/file')

exports.getdashboard = async (req, res)=>{
   const userFiles = await files.find({user:req.user.email}).sort({originalName:1})
   console.log(userFiles)
   res.render('home',{user:req.user,docs:userFiles})
}

// exports.uploadFile = async (req,res)=>{
//    console.log(req.file,req.user.user_name)
//    const name = req.user.email
//    const newFile  = await new fileUpload({
//       user:name,
//       filePath:req.file.path,
//       originalName:req.file.originalname
//    }).save(error=>{
//       if(error){
//          console.log(error)
//       }else{
//       console.log("file uploaded")
//       res.redirect('/account/dashboard/home')
//       }
//    }
//    )
   
// }
