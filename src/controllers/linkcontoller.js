const linkModel = require("../Model/link")
const userModel = require("../Model/User")
const validation = require("../validation/validation")
const mongoose = require('mongoose')
const axios = require('axios')







const createLink = async function (req, res) {

    try {
        // let paramId = req.params.userId

        // if (!mongoose.Types.ObjectId.isValid(paramId))
        //     return res.status(400).send({ status: false, msg: "Please enter valid path Id" });

        // let finduser = await userModel.findById(paramId).select({ __v: 0 })
        // if (!finduser) {
        //     return res.status(400).send({ status: false, msg: " enter a wrong userid" })
        // }
        const idFromToken =decodedtoken.id
        
        let { username,  userId,link } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "You have to put details for create a user" })
        }

        
        if (!(username)) {
            return res.status(400).send({ status: false, msg: "username is mendatory for add link" })
        }
        if (!(/^[a-zA-Z0-9]+$/).test(username)) {
            return res.status(400).send({ status: false, msg: "please Enter valid username " })
        }
        
        if (!userId) {
            return res.status(400).send({ status: false, msg: "need the userid for furture process" })
        }
        if (!mongoose.Types.ObjectId.isValid(userId))
            return res.status(400).send({ status: false, msg: "Please enter valid User Id" });

            if(idFromToken !==userId){
                return res.status(403).send({ status: false, msg: "Unauthorized Access you are not authorised" });
            }

        if (!(link)) {
            return res.status(400).send({ status: false, msg: "link is mandatory for add a link" })
        }
        let correctLink = false
        await axios.get(link)
            .then((res) => { if (res.status == 200 || res.status == 201) correctLink = true; })
            .catch((error) => { correctLink = false })
        if (correctLink == false)return res.status(400).send({ status: false, message: "invalid url please enter valid url!!" });
        let extraLink = await userModel.findOne({ username:username,userId: userId })
        // console.log(extraLink)
        if(!extraLink){
            return res.status(400).send({status:false,msg:"no user is found with this Id"})
        }
        let arr1
        if (extraLink.userId==userId) {
        //.userId==userId
            arr1 = extraLink.link
            arr1.push(link)
            let dataforupdate = { "link": arr1, "count": extraLink.count + 1 }
            // console.log(dataforupdate)
            let final = await userModel.findOneAndUpdate({username:username, userId: userId }, { $set: dataforupdate }, { new: true })
             console.log(final)
            return res.status(201).send({ status: true, message: "success", data: final })
        }
        if (extraLink) {
            let itemforadd = {

                // "name": name,
                "userId": userId,
                "username": username,
                "link": link,
                "count": 1
            }
            let addlink = await linkModel.create(itemforadd)

            // finduser.link = finduser.link + 1
            // await finduser.save()
            let printLink = await linkModel.findOne({ _id: addlink }).select({ __v: 0, createdAt: 0, updatedAt: 0 })
            // finduser = finduser.toObject()

            extraLink = printLink

            return res.status(201).send({ status: true, message: "success", data: extraLink })
        }

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



const getLink = async (req, res) => {
    try {
        const filter = { isDeleted: false }

        const queryParams = req.query
        {
            const { username } = queryParams
            if (username) {

                filter['username'] = username
            }
        }
        const links = await linkModel.find(filter).select({ name: 1, link: 1 }).collation({ locale: "en" }).sort({ links: 1 })

        if (Object.keys(links).length == 0)
            return res.status(404).send({ status: false, msg: "No Such link found" })

        return res.status(200).send({ status: true, message: 'links are there', data: links })
    }catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}



const deleteLink = async (req, res) => {

    try {
        const linkId = req.params.linkid;
        if (!mongoose.Types.ObjectId.isValid(linkId)) {
            return res.status(400).send({ status: false, msg: "this  linkId is not a valid Id" });
        }

        const findLinkbyId = await linkModel.findOne({
            _id: linkId,
            isDeleted: false,
        });
        if (!findLinkbyId)
            return res.status(404).send({ status: false, msg: "Link Not Found or Does Not Exist" });

        await linkModel.findOneAndUpdate(
            { _id: linkId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true }
        );
        return res.status(200).send({ status: true, message: " Link has been deleted successfully", });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};




module.exports = { createLink, getLink, deleteLink }
