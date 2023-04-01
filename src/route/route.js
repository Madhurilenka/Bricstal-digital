
const express =require('express');
const router = express.Router();
const user = require('../controllers/usercontroller');
const link = require('../controllers/linkcontoller')
const hash = require("../controllers/hashtagController")
const middleware = require("../middleware/auth")

router.post("/register",user.CreateUser)
router.post("/login",user.Login)
router.delete("/deleteUser",middleware.authentication,user.deleteUser)


router.post("/createlink",middleware.authentication, link.createLink)
router.get("/username", link.getLink)

router.delete("/deleteLink",middleware.authentication,link.deleteLink)
//middleware.authorisation,

//-----------------------------hashTag----------------------------------------//

router.post("/CreateHashTag",hash.CreatHashTag)


router.all("/*", function (req, res) {
    res.status(400).send({ status: false, message: "Invalid path params" });
  });



module.exports=router