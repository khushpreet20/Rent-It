import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
const authenticateUser = async(req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log(token);
        
        if(!token){
            // console.log('hi');
            res.status(401).json('Unauthorized request')
            return
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?._id).select("-password -confirmpassword -refreshToken")

        req.user = user;
        // console.log(req.user);
        
        // res.json(user)
        next()
    } catch (error) {
        console.log('Error int user authentication');
        throw error;
    }
    // console.log(req.cookies);
    
    // res.json("User")   
}

export {authenticateUser}