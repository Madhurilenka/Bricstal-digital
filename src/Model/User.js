const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    title: { type:String, required:true, enum:["Mr", "Mrs", "Miss"]},
    name: { type:String, required:true,trim:true},
    gender:{type:String,required:true,enum:["Male","Female","Other"]},
    phone: { type:String, required:true, unique:true,trim:true},
    email: { type:String, required:true,  unique:true,trim:true},
    password: { type:String, required:true,trim:true},
    
},
    { timestamps: true });


module.exports = mongoose.model("Person", UserSchema)