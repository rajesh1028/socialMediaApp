const express = require("express");
const { PostModel } = require("../models/post.model")
require("dotenv").config()


const postRoute = express.Router();

postRoute.get("/", async (req, res) => {
    let query = req.query;
    try {
        let data = await PostModel.find(query)
        if(data.length>0){
            res.send(data);
        }else{
            res.send("No data found: Data is empty");
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

postRoute.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        if(payload){
            let post = new PostModel(payload);
            await post.save();
            res.send("Posted successfully");
        }else{
            res.send("Enter the data");
        }
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

postRoute.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    const post = await PostModel.findOne({ "_id": id });
    const userID_note = post.UserID;
    const userID_req = req.body.UserID;

    try {
        if (userID_note != userID_req) {
            res.send({ "msg": "You are not authorized" });
        } else {
            await PostModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("Updated the note");
        }
    } catch (error) {
        console.log(error)
        res.send({ "msg": "Something went wrong" })
    }
})

postRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const post = await PostModel.findOne({ "_id": id });
    const userID_note = post.UserID;
    const userID_req = req.body.UserID;

    try {
        if (userID_note != userID_req) {
            res.send({ "msg": "You are not authorized" });
        } else {
            await PostModel.findByIdAndDelete({ "_id": id })
            res.send("Deleted the note");
        }
    } catch (error) {
        console.log(error)
        res.send({ "msg": "Something went wrong" })
    }
})

module.exports = { postRoute }

