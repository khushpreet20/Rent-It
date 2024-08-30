import mongoose, {Schema} from "mongoose";

const placeSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String
    },
    address: {
        type: String
    }, 
    photos: {
        type: [String]
    },
    description: {
        type: String
    },
    perks:{
        type: [String]
    },
    extraInfo: {
        type: String
    },
    checkIn: {
        type: String
    },
    checkOut: {
        type: String
    },
    maxGuest: {
        type: Number
    },
    price: {
        type: Number
    },
    
},{timestamps: true})

export const Place = mongoose.model("Place", placeSchema);