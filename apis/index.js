import express, { urlencoded } from "express"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from "dotenv"
import {auth, loginUser, logoutUser, registerUser } from "./controllers/userController.js"
import cookieParser from "cookie-parser"
import { authenticateUser } from "./middlewares/auth.middleware.js"
import { upload } from "./middlewares/multer.middleware.js"
import { addPlaces, listAccommodation, listMyAccommodations, updatePlaces, listAllPlaces } from "./controllers/placeController.js"
import { bookPlace, listAllBookings } from "./controllers/bookingController.js"

dotenv.config({
    path: './.env'
})
const app = express()
app.use(cors({
    credentials: true,
    // origin: 'http://localhost:5173'
    origin: 'https://rent-it-client.vercel.app'
}))
// app.use(cors({credentials: true}))
app.use(express.json())
app.use(express.urlencoded({limit: "20kb", extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
app.get('/test', (req, res)=>{
    console.log('api hit');
    res.json('test ok');
})

const port_num = process.env.PORT || 4000 ;
const connectDB = async() =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log('DB connected!!');
        
    } catch (error) {
        console.error('Error in connecting DB', error)
        throw error;
    }
}

connectDB()

// app.post('/register', (req, res, next)=>{
//     // const {username, email, password, confirmpassword} = req.body
//     // res.json({
//     //     username, 
//     //     email, 
//     //     password, 
//     //     confirmpassword
//     // })
//     registerUser
// })

app.post('/register', registerUser)
app.post('/login', loginUser)
// app.get('/auth', (req, res)=>{
//     console.log(req.cookies);
//     res.json('user')
// })
app.get('/auth',authenticateUser, auth)
app.get('/profile', (req, res, next)=>{
    res.json('ssa ji')
})
// app.get('/', authenticateUser)
app.get('/logout',authenticateUser,logoutUser)
// app.get('/logout',logoutUser)

app.post('/upload', upload.array('photos', 50), (req, res) => {
    console.log(req.files);
    const uploadedPhotos = []
    req.files.map(file => (
        // uploadedPhotos.push({filename: file.filename, path: '/upload/temp/' + file.filename})
        uploadedPhotos.push(file.filename)
    ))
    // res.json(req.files)
    res.json(uploadedPhotos)
})

app.post('/user-places', authenticateUser, addPlaces);
app.get('/user-places', authenticateUser, listMyAccommodations);
app.get('/user-places/:id', listAccommodation); // yhaan middleware lagane ka soch rha hu such that ki agar authorized user nhi h toh woh just view kr ske accommodation ko.
app.put('/user-places/:id', authenticateUser, updatePlaces) 
app.get('/places',listAllPlaces);
app.post('/bookings', authenticateUser, bookPlace)
app.get('/bookings', authenticateUser, listAllBookings)
app.listen(port_num, (req, res, next) =>{
    console.log(`App listening on port ${2004}`);
})