import { Booking } from "../models/booking.model.js";

const bookPlace = async(req, res, next) => {
    try {
        const userid = req.user._id;
        // console.log(id);
        
        const {id, checkIn, checkOut, guest, your_name, phone, finalPrice} = req.body;
        
        const bookingDoc = await Booking.create({
            accomodationId: id,
            checkin: checkIn,
            checkout: checkOut, 
            price: finalPrice,
            guests: guest,
            phone: phone,
            name: your_name,
            bookedBy: userid
        })

        res.json(bookingDoc)
        
    } catch (error) {
        throw new Error("Error in booking", error);
    }
}
const listAllBookings = async(req, res, next) => {
    try {
        const userid = req.user._id;
        // console.log(userid);
        
        if(userid){
        
            const bookingDoc = await Booking.find({bookedBy : userid}).populate('accomodationId')

            res.json(bookingDoc)
        }
        
    } catch (error) {
        throw new Error("Error in booking", error);
    }
}

export {bookPlace, listAllBookings};