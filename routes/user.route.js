const express = require("express");
const { UserModel } = require("../models/user.model")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    console.log(req.body);
    let { name, email, gender, password } = req.body;

    try {
        bcrypt.hash(password, 5, async (err, secure_password) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                let user = new UserModel({ name, email, gender, password: secure_password });
                await user.save();
                res.send("Registered successfully")
            }
        })
    } catch (error) {
        console.log(error);
        res.send("err in registering")
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        let hashed_password = user[0].password
        if (user.length > 0) {
            bcrypt.compare(password, hashed_password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID:user[0]._id }, process.env.key, {expiresIn:'2h'})
                    res.send({ "msg": "Login Successful", "token": token });
                } else {
                    res.send("Wrong credentials");
                }
            })
        } else {
            res.send("Wrong credentials");
        }
    } catch (error) {
        console.log(error)
        res.send("Error in login in")
    }
})







module.exports = { userRoute };
