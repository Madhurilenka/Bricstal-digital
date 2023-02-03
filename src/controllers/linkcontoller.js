const linkModel = require("../Model/link")
const userModel = require("../Model/User")
const validation = require("../validation/validation")
const mongoose = require('mongoose')
const axios = require('axios')



let isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0 && value === null) return false
    // if(typeof value ==="number" && value.toString().trim.length===0) return false
    return true
}


const createLink = async function (req, res) {
    // console.log(req)
    try {
        let paramId = req.params.userId
        // console.log(paramId)
        if (!mongoose.Types.ObjectId.isValid(paramId))
            return res.status(400).send({ status: false, msg: "Please enter valid path Id" });

        let finduser = await userModel.findById(paramId).select({ __v: 0, deletedAt: 0, })
        if (!finduser) {
            return res.status(400).send({ status: false, msg: " enter a wrong userid" })
        }

        let { title, name, userId, link } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "You have to put details for create a user" })
        }
        if (!(title)) {
            return res.status(400).send({ status: false, msg: "Title is mendatory for Create a User" })
        }
        if (!["Mr", "Mrs", "Miss"].includes(title)) {
            return res.status(400).send({ status: false, msg: "Title must be only in['Mr','Mrs','Miss']" })
        }
        if (!(name)) {
            return res.status(400).send({ status: false, msg: "Name is mendatory for Create a User" })
        }
        if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(name)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
        }
        if (!userId) {
            return res.status(400).send({ status: false, msg: "give user id" })
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, msg: `please enter a valid userID` })
        }
        let extraLink = await linkModel.findOne({title:title,name:name})
         if(extraLink){
            
         }
        let Url = {
            method: "get",
            url: link,
          }
          let checkingUrl = await axios(Url)
            .then(() => link)
            .catch(() => null)

            if (!checkingUrl) {
                return res.status(400).send({ status: false, message: `This Link: ${link} is not Valid URL.` })
              }
        if (!isValid(link))
            return res.status(400).send({ status: false, msg: "Plese enter link" })

        let addlink = await linkModel.create(req.body)

        finduser.link = finduser.link + 1
        await finduser.save()
        let printLink = await linkModel.findOne({ _id: addlink }).select({ __v: 0, createdAt: 0, updatedAt: 0 })
        finduser = finduser.toObject()

        finduser = printLink
        return res.status(201).send({ status: true, message: "success", data: finduser })
    } catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}


module.exports = { createLink }
