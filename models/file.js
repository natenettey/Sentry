const mongoose = require("mongoose")
const Schema  = mongoose.Schema
const fileSchema  = new Schema({
    user: { type: String ,
         required: true },
    filePath:{
        type:String,
        required:true
    }, 
    originalName:{
        type:String,
        required:true
    },
    encryptedpassword:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

}
    
)

fileSchema.virtual('url').get(function(){
    return '/files/download/'+this._id
})
module.exports = mongoose.model("File",fileSchema)