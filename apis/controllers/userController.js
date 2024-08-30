import { User } from "../models/user.model.js";
import jwt  from "jsonwebtoken";

const generateRefreshandAccessTokens = async(user) => {
    try {
        const accesstoken = user.generateAccessToken();
        const refreshtoken = user.generateRefreshToken();
        user.refreshToken = refreshtoken;
        await user.save({validateBeforeSave: false});
        return {accesstoken, refreshtoken};
    } catch (error) {
        res.status(501)
        throw new Error("Unable to generate access and refresh token")
    }
}
const registerUser = async (req, res, next) =>{
    try {
        const {username, email, password, confirmpassword} = req.body;

        if(!username || !email || !password || !confirmpassword){
            res.status(400);
            throw new Error("Field is required")
        }

        const ExistingUser = await User.findOne({
            $or:{
                username,
                email
            }
        })

        if(ExistingUser){
            res.status(409);
            throw new Error("User already exists")
        }

        if(password !== confirmpassword){
            res.status(401)
            throw new Error("Password is not confirmed")
        }
        const user = await User.create({
            username,
            email,
            password,
            confirmpassword,
        })

        if(!user){
            res.status(500);
            throw new Error("User not created");
        }
        else{
            return res.status(200).json({
                message: "ok",
            });
        }

        // bhai ne bhi bcrypt use kiya h so same kaam h tension mat liyo
    } catch (error) {
        throw new Error("An error occured while registering")
    }
}

const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body ;
        if(!email || !password){
            return res.status(400).json("Field is required for login")
            // throw new Error("Field is required for login")
        }
    
        const ExistingUser = await User.findOne({email})
    
        if(!ExistingUser){
            return res.status(404).json("User doesnot exists")
            // throw new Error('User doesnot exists.')
        }
    
        if(!await ExistingUser.isPasswordCorrect(password)){
            return res.status(401).json("Invalid Username or Password")
            // throw new Error('Invalid Username or Password')
        }
        const {accesstoken, refreshtoken} = await generateRefreshandAccessTokens(ExistingUser);
        
        const loggedInUser = await User.findById(ExistingUser._id).select("-password -confirmpassword -refreshToken")
        // now login is done its time for access and refresh tokens -> bhai ko dekhle usne kaise kiya h

        const options={
            secure:true,
            httpOnly: true,
            sameSite: 'None'
        }
        return res.status(200)
        .cookie("accessToken", accesstoken, options)
        .cookie("refreshToken", refreshtoken, options)
        .json({
            status: 200,
            data:{
                user: loggedInUser,
                accessToken: accesstoken,
                refershToken: refreshtoken,
            },
            message: "User logged In Successfully",
            success:  true
        })
    } catch (error) {
        console.log('Error in user login');
        throw error;
    }
}

// const authenticateUser = async(req, res, next) => {
//     try {
//         const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
//         if(!token){
//             res.status(401).json('Unauthorized request')
//         }
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
//         const user = await User.findById(decodedToken?._id).select("-password -confirmpassword -refreshToken")

//         req.user = user;
//         // res.json(user)
//     } catch (error) {
//         console.log('Error int user authentication');
//         throw error;
//     }   
// }
const logoutUser = async(req, res, next) => {
    // console.log(req.user);
    const username = req.user._id
    
   await User.findByIdAndUpdate(username, 
    {
        $set:{
            refreshToken: undefined
        }
    },
    {
        new: true
    }
   ) 
   const options = {
    httpOnly: true, 
    secure: true,
    sameSite: 'None'
   }

   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json({
    status: 200,
    data: {},
    message: 'Logged Out User',
    success : true
   })
}

const auth = async(req, res, next) => {
    res.json(req.user)
}
export {registerUser, loginUser, logoutUser, auth}