import mongoose, {Schema} from "mongoose";

const bookingSchema = new Schema({
    accomodationId: {
        type: Schema.Types.ObjectId,
        ref: "Place"
    },
    bookedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    checkin: {
        type: String,
        required: true
    },
    checkout: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {timestamps: true});

export const Booking = mongoose.model('Booking', bookingSchema);