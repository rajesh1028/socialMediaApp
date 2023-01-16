const express = require("express");
require("dotenv").config();
const {connection} = require("../Backend/config/db")
const {userRoute} = require("./routes/user.route");
const {postRoute} = require("./routes/post.route")
const {authenticate} = require("./middleware/authenticate.middleware")

const app = express();
app.use(express.json());
 app.use("/users", userRoute);
 app.use(authenticate);
 app.use("/posts", postRoute);


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log(`server is running at ${process.env.port}`)
})