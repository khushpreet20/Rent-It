import { Place } from "../models/places.model.js";
const addPlaces = async (req, res, next) => {
    try {
        const id = req.user._id;
        // console.log(id);
        
        const {title, address, photos, description, perks, extraInfo, checkintime, checkouttime, maxGuest, price} = req.body;
        const placDoc = await Place.create({
            owner: id,
            title: title,
            address: address, 
            photos: photos,
            description: description,
            perks: perks,
            extraInfo: extraInfo,
            checkIn: checkintime,
            checkOut: checkouttime,
            maxGuest: maxGuest,
            price: price,
        })

        res.json(placDoc)
        
    } catch (error) {
        throw new Error('Error while adding accommodity')
    }
}

const listMyAccommodations = async(req, res) => {
    try {
        const id = req.user._id;
        // console.log(id);
        
        const places = await Place.find({owner : id});
        res.json(places);
    } catch (error) {
        throw new Error('Error in listing User Accommodations')
    }
}

const listAccommodation = async(req, res, next) => {
    try {
        const {id} = req.params;
        res.json(await Place.findById(id).select("-_id -owner"));
    } catch (error) {
        throw new Error('Error in listing the accommodation')
    }
}

const updatePlaces = async(req, res, next) => {
    try {
        const user_id = req.user._id;
        // console.log(id);
        
        const {id, title, address, photos, description, perks, extraInfo, checkintime, checkouttime, maxGuest, price} = req.body;

        // console.log(checkintime);
        
        const placeDoc = await Place.findById(id);
        const ownerId = placeDoc.owner;
        // console.log(placeDoc.owner)
        // user_id = user_id.toString();
        // ownerId = ownerId.toString();
        // console.log(typeof(ownerId), ownerId.toString());
        // console.log(typeof(user_id), user_id.toString());
        // console.log(ownerId === user_id);
        
        if(ownerId.toString() === user_id.toString()){
            // placeDoc.updateOne()
            placeDoc.set({
                title: title,
                address: address, 
                photos: photos,
                description: description,
                perks: perks,
                extraInfo: extraInfo,
                checkIn: checkintime,
                checkOut: checkouttime,
                maxGuest: maxGuest,
                price: price
            })
            
            // console.log('hello');
            await placeDoc.save();
            res.json("Ok")

        }
        else{
            res.json("Not Ok")
        }
        // const placDoc = await Place.findByIdAndUpdate({
            //     owner: id,
        //     title: title,
        //     address: address, 
        //     photos: photos,
        //     description: description,
        //     perks: perks,
        //     extraInfo: extraInfo,
        //     checkIn: checkintime,
        //     checkOut: checkouttime,
        //     maxGuest: maxGuest
        // })

        // res.json(placDoc)
    } catch (error) {
        // throw new Error('Error in updating the accommodation')
        res.json('Not updated')
    }
}

const listAllPlaces = async (req, res, next) => {
    res.json(await Place.find());
}
export {addPlaces, listMyAccommodations, listAccommodation, updatePlaces, listAllPlaces};