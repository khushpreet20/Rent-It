import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
const userSchema = new Schema({
    username:{
        type: String,
        required: true, 
        unique: true, 
    },
    email:{
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true
    },
    confirmpassword: {
        type: String, 
        unique: true, 
    },
    refreshToken: {
        type: String,
    }

},{timestamps:true})


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 5);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 5)
    }
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        console.error('Unable to validate password', error);
        throw error
    }
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);