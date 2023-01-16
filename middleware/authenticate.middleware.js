const jwt = require("jsonwebtoken");
require("dotenv").config()


const authenticate = async (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token,process.env.key)
        if(decoded){
            let userID = decoded.userID;
            req.body.userID = userID;
            next()
        }else{
            res.send("Login in first")
        }
    }else{
        res.send("Please login")
    }
}



module.exports = { authenticate }