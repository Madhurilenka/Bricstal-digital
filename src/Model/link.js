const mongoose = require('mongoose')
// const Aws = require('../AWS/dynamodb')


const LinkSchema = new mongoose.Schema({


    // name: { type:String, required:true,trim:true},
    username:{type:String, required:true,ref:"user",trim:true},
   
    linkinformation:[{
      // linkname:{type:String, required:true,trim:true},
      linksrc:{type:String,trim:true},
      linkname:{type:String, required:true,trim:true},
      linkId:{type:Number,defult:0,trim:true},
       deletedAt: { type: Date, default: null },
     isDeleted: { type: Boolean, default: false },

    }],
     count:{type:Number,defult:0,trim:true},
    



},
    { timestamps: true });


module.exports = mongoose.model("Link", LinkSchema)
