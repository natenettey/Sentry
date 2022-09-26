exports.getdashboard = (req, res)=>{
   res.render('home',{user:req.user})
}