exports.getdashboard = (req, res)=>{
   res.render('home',{user:req.user})
}

exports.uploadFile = (req,res)=>{
   console.log(req.file)
}
