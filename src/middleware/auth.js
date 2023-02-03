const jwt = require('jsonwebtoken')
const user = require("../controllers/usercontroller")
const mongoose = require('mongoose')


const Authentication = function (req,res,next) {
   try {

    let token = req.header['x-api-key']
    if(!token){
        return res.status(400).send({status:false,msg:"token must be present for varification"})
    }
    jwt.verify(token,"bricstal-digital-group", function (error, decoded) {
        if (error) return res.status(400).send("this token is invalid")
        else {
           decodedtoken = decoded
           next()
        }
     })
    
   } catch (error) {
    return res.status(500).send({status:false,msg:error.massege})
   }

}


module.export={Authentication}