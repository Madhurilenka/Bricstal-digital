
const express =require('express');
const router = express.Router();
const user = require('../controllers/usercontroller');
const link = require('../controllers/linkcontoller')
const middleware = require("../middleware/auth")

router.post("/register",user.CreateUser)
router.post("/login",user.Login)
router.delete("/deleteUser",middleware.authentication,user.deleteUser)


router.post("/createlink",middleware.authentication, link.createLink)
router.get("/linkId", link.getLink)

router.delete("/deleteLink",middleware.authentication,link.deleteLink)
//middleware.authorisation,



// router.all("/*", function (req, res) {
//     res.status(400).send({ status: false, message: "Invalid path params" });
//   });



module.exports=router