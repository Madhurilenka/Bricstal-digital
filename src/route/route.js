
const express =require('express');
const router = express.Router();
const user = require('../controllers/usercontroller');
const link = require('../controllers/linkcontoller')
const auth = require('../middleware/auth')

router.post("/register",user.CreateUser)
router.post("/login",user.Login)


router.post("/userId/:userId",link.createLink)






// router.all("/*", function (req, res) {
//     res.status(400).send({ status: false, message: "Invalid path params" });
//   });



module.exports=router