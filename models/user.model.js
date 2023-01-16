const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String,
    userID:String
})

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel }