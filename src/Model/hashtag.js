const mongoose = require('mongoose')
// const Aws = require('../AWS/dynamodb')


const HashSchema = new mongoose.Schema({

    
    
    username:{type:String, required:true,trim:true},
    hashTag:{type:String,required:true,trim:true},
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },

},
    { timestamps: true });


module.exports = mongoose.model("Hashtag", HashSchema)
