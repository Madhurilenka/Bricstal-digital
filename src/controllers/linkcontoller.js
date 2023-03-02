const linkModel = require("../Model/link")
const userModel = require("../Model/User")
const mongoose = require('mongoose')
const axios = require('axios')
// const Aws = require('../AWS/dynamodb')







const createLink = async function (req, res) {


    try {
        let { username, link, linkname } = req.body
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "You have to put details for create a user" })
        }
        if (!(username)) {
            return res.status(400).send({ status: false, msg: "username is mendatory for add link" })
        }
        if (!(/^[a-zA-Z0-9]+$/).test(username)) {
            return res.status(400).send({ status: false, msg: "please Enter valid username " })
        }

        if (!(link)) {
            return res.status(400).send({ status: false, msg: "link is mandatory for add a link" })
        }
        let correctLink = false
        await axios.get(link)
            .then((res) => { if (res.status == 200 || res.status == 201) correctLink = true; })
            .catch((error) => { correctLink = false })
        if (correctLink == false) return res.status(400).send({ status: false, message: "invalid url please enter valid url!!" });
        let extraLink = await userModel.findOne({ username: username })
        // // console.log(extraLink)
        if (!extraLink) {
            return res.status(400).send({ status: false, msg: "no user is found with this username" })
        }

        let extra = await linkModel.findOne({ username: username })
        // console.log(extra)
        if (extra) {
            let arr1
            if (extra.username == username) {

                arr1 = extra.linkinformation

                // console.log(extra["linkinformation"][arr1.length - 1].linkId + 1)
                let data = {
                    "linkname": linkname,
                    "linksrc": link,
                    "linkId": extra["linkinformation"][arr1.length - 1].linkId + 1
                }
                arr1.push(data);

                let dataforupdate = { "linkinformation": arr1, "count": extra.count + 1 }

                let final = await linkModel.findOneAndUpdate({ username: username, }, { $set: dataforupdate }, { new: true })
                //  console.log(final)
                return res.status(201).send({ status: true, message: "success", data: final })
            }
        }
        else {
            let itemforadd = {
                "username": username,
                "count": 1,
                "linkinformation": [{
                    "linkname": linkname,
                    "linksrc": link,
                    "linkId": 01
                }]
            }
            let addlink = await linkModel.create(itemforadd)


            let printLink = await linkModel.findOne({ _id: addlink }).select({ __v: 0, createdAt: 0, updatedAt: 0 })

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
        const links = await linkModel.find(filter).collation({ locale: "en" }).sort({ links: 1 })

        if (Object.keys(links).length == 0)
            return res.status(404).send({ status: false, msg: "No Such link found" })

        return res.status(200).send({ status: true, message: 'links are there', data: links })
    } catch (err) {
        res.status(500).send({ status: false, Error: err.message })
    }
}


    const deleteLink = async (req, res) => {

        try {
    // console.log("hii")
            let {username,linkId} = req.query
            if (Object.keys(req.query).length == 0) {
                return res.status(400).send({ status: false, msg: "You have to put details for delete the user" })
            }
            if(!username){
                return res.status(400).send({status:false,msg:"You have to put users name for furture process"})
            }
            if(!linkId){
                return res.status(400).send({status:false,msg:"You have to select the link to delete link"})
            }
           
            const findLinkbyId = await linkModel.findOne({
                 linkId:linkId,
                 username:username,
                isDeleted: false,
            });
            // console.log(findLinkbyId)
            if (findLinkbyId.linkinformation[linkId-1].isDeleted == true)
                 return res.status(404).send({ status: false, msg: "Link Not Found or Does Not Exist or already deleted" });

            findLinkbyId.save(findLinkbyId.linkinformation[linkId-1].isDeleted==true)
            // console.log(findLinkbyId.linkinformation[linkId-1])
            findLinkbyId.linkinformation[linkId-1].isDeleted = true;
           findLinkbyId.linkinformation[linkId-1].deletedAt =Date.now();
            // linkModel.save()
            
            await linkModel.findOneAndUpdate(
                { username:username, isDeleted: false },
                { $set: { "linkinformation[linkId-1].isDeleted": true, deletedAt: new Date() } },
                { new: true }
            );
            // console.log(findLinkbyId.linkinformation[linkId-1])
            return res.status(200).send({ status: true, message: " Link has been deleted successfully", });
            
           
            
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
        }
    };

module.exports = { createLink, getLink, deleteLink } 
