const userModel = require("../Model/User")
const jwt = require('jsonwebtoken')

const CreateUser = async (req, res) => {
    // console.log(req.body)
    try {
        let { title, name, gender, phone, email, password } = req.body

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
        if (!(gender)) {
            return res.status(400).send({ status: false, msg: "Gender is mendatory for Create a User" })
        }
        if (!["Male", "Female", "Other"].includes(gender)) {
            return res.status(400).send({ status: false, msg: "Gender must be only in['Male','Female','Other']" })
        }
        if (!(phone)) {
            return res.status(400).send({ status: false, msg: "Phone number is mendatory for Create a User" })
        }
        // if (!(username)) {
        //     return res.status(400).send({ status: false, msg: "Name is mendatory for Create a User" })
        // }
        // if (!(/^[a-zA-Z0-9]+$/).test(username)) {
        //     return res.status(400).send({ status: false, msg: "please Enter valid username " })
        // }
        if (!(/^[\s]*[6-9]\d{9}[\s]*$/).test(phone)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid phone Number" })
        }
        if (!(email)) {
            return res.status(400).send({ status: false, msg: "Email is mendatory for Create a User" })
        }
        if (!(/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/).test(email)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid Email" })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "Please enter Password for registartion" })
        }
        if (!(/^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/).test(password)) {
            return res.status(400).send({ status: false, msg: "please Enter valid Password and it's length should be 8-15" })
        }
        let existphone = await userModel.findOne({ phone: phone })
        if (existphone) { return res.status(400).send({ status: false, msg: "User with this phone number is already registered." }) }

        // let existusername = await userModel.findOne({ username: username })
        // if (existusername) { return res.status(400).send({ status: false, msg: "This  username is already registered." }) }

        let existEmail = await userModel.findOne({ email: email })
        if (existEmail) { return res.status(400).send({ status: false, msg: "User with this email is already registered" }) }

        let savedData = await userModel.create(req.body);
        return res.status(201).send({ status: true, message: 'Success', data: savedData });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.massege })

    }

}



const Login = async (req, res) => {
    try {

        const { email, password } = req.body
        if (!email) {
            return res.status(400).send({ status: false, msg: "Email is mandatory for logging In" })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "Password is mandatory for logging In" })
        }
        let data = await userModel.findOne({ email: email, password: password })

        if (!data) {
            return res.status(400).send({ status: false, msg: "Email or Password is incorrect.Please recheck it" })
        }
        
        let token = await jwt.sign({ id: data._id.toString() }, "bricstal-digital-group")
        res.header({ "x-api-key": token })
        return res.status(200).send({ status: true, message: "Login Successful", data: token })
    }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }


}

module.exports = { CreateUser, Login }