const mongoose = require('mongoose')
// const Aws = require('../AWS/dynamodb')


const UserSchema = new mongoose.Schema({

    
    name: { type:String, required:true,trim:true},
    gender:{type:String,required:true,enum:["Male","Female","Other"]},
    phone: { type:String, required:true, unique:true,trim:true},
    username:{type:String, required:true,trim:true},
    email: { type:String, required:true,  unique:true,trim:true},
    password: { type:String, required:true,trim:true},
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },

},
    { timestamps: true });


module.exports = mongoose.model("Person", UserSchema)
