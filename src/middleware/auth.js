const jwt = require('jsonwebtoken')
const user = require("../controllers/usercontroller")
const linkModel = require("../Model/link")
const mongoose = require('mongoose')


const authentication = function (req,res,next) {
   try {

    let token = req.headers['x-api-key']
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
const authorisation = async (req,res,next)=>{
   try {
const idFromToken =decodedtoken.id
let linkId = req.params.linkid
if(linkId){
   if (!mongoose.Types.ObjectId.isValid(linkId)) {
      return res.status(400).send({ status: false, msg: "Please Enter Valid link Id " })
  }
let linkdata = await linkModel.findById(linkId)
if(!linkdata){
return res.status(404).send({status:false,msg:"no  link found"})
}
let updateuser = linkdata.username //.toString()
if(idFromToken !==updateuser){
   return res.status(403).send({ status: false, msg: "Unauthorized Access!!!...you are not authorised" });
        }else{
            next()
        }
}
      } catch (err) {
         return res.status(500).send({ status: false, error: err.message });
     }
}





module.exports={authentication,authorisation}