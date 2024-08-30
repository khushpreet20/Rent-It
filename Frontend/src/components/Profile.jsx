import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { NavLink, Link } from 'react-router-dom'
import Places from './PlaceForm.jsx'
import axios from 'axios'
import AccountNav from './AccountNav.jsx'
import Booking from './Bookings.jsx'
function Profile() {
    const {user, setUser} = useContext(UserContext)
    // let {subpage} = useParams()
    // let {subpage} = useLocation()
    // let subpage = useLocation().pathname.split('/')?.[2];
    // console.log(subpage);
    
    // let {action} = useParams()
    
    const [redirect, setRedirect] = useState(false)
    // const[place, setPlace] = useState(false);
    // console.log(subpage);
    // const currLink = () => {
    //     if(!subpage){

    //     }
    // }
    if(!user){
        <Navigate to = '/login'/>
    }

    const logout = async(e)=>{
        try{
            e.preventDefault()
            const res = await axios.get('/logout',{
                withCredentials: true
            })
            // console.log(res.data);
            // if(res.data.status === 200){
            // }
            // <Navigate to = '/'/>
            setRedirect(true)
            setUser(null)
            // console.log(redirect);
            
            // if(res){
            // }
        }catch(err){
            console.error('Unable to logout', err);
            throw err
        }
    }

    if(redirect){
        return <Navigate to = {'/login'}/>
    }
  return (
    <>
        {/* myProfile: {user?.username} */}
        {/* <div className='w-full flex font-bold justify-center mt-4 mb-8'> */}
            {/* <NavLink className ={({isActive})=>(
                isActive ? 'py-2 px-4 bg-gray-300 rounded-full' : 'py-2 px-4'
            )}
            to = '/profile'>
                My Profile
                
            </NavLink>

            <NavLink className ={({isActive})=>(
                isActive? 'py-2 px-4 bg-gray-300 rounded-full' : 'py-2 px-4'
            )}
            to = '/profile/booking'>
                My Bookings
            </NavLink>

            <NavLink className ={({isActive})=>(
                isActive? 'py-2 px-4 bg-gray-300 rounded-full' : 'py-2 px-4'
            )}
            to = '/profile/accommodation'>
                My Accommodations
            </NavLink> */}
            <AccountNav/>
            {/* <NavLink className = {!subpage ? 'py-2 px-4 bg-gray-300 rounded-full' : 'py-2 px-4'}
            to = '/profile'>
                My Profile
            </NavLink>

            <NavLink className ={subpage === 'booking' ? 'py-2 px-4 bg-gray-300 rounded-full' : 'py-2 px-4'}
            to = '/profile/booking'>
                My Bookings
            </NavLink>

            <NavLink className ={subpage === 'accommodation' ? 'py-2 px-4 bg-gray-300 rounded-full' : 'py-2 px-4'}
            to = '/profile/accommodation'>
                My Accommodations
            </NavLink> */}
        {/* </div> */}
        <div className='flex flex-col justify-between items-center max-w-lg mx-auto gap-3'>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <button onClick={(e) => logout(e)}
            className= 'bg-primary text-white rounded-md p-2'>Logout</button>
        </div>
        {/* {!subpage ? 
        <div className='flex flex-col justify-between items-center max-w-lg mx-auto gap-3'>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <button onClick={(e) => logout(e)}
            className= 'bg-primary text-white rounded-md p-2'>Logout</button>
        </div> : null} */}
        {/* {subpage === 'booking'? 
        <Booking/> : null} */}
        {/* {subpage === 'accommodation' ? 
        <div className='flex flex-col justify-between items-center max-w-lg mx-auto gap-3'>
            <Link onClick={() => setPlace(true)}
            to = '/profile/accommodation/newplace'
            className = "bg-primary text-white py-2 px-6 rounded-full flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new Place
            </Link>
            <Places/>
        </div> : null} */}
    </>
  )
}

export default Profile