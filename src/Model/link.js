const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({


    // name: { type:String, required:true,trim:true},
    username:{type:String, required:true,trim:true},
    userId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:"user",trim:true},
     link:[{type:String,trim:true}],
     count:{type:Number,defult:0,trim:true},
     deletedAt: { type: Date, default: null },
     isDeleted: { type: Boolean, default: false },




},
    { timestamps: true });


module.exports = mongoose.model("Link", UserSchema)
