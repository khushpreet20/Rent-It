import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
function AccountNav() {
    let subpage = useLocation()
    let ext = subpage.pathname.split('/')?.[2];
    // console.log(ext);

    
  return (
    <>
        <div className='w-full flex font-bold justify-center mt-4 mb-8'>
            <NavLink className ={({isActive})=>(
                    isActive && !ext ? 'py-2 px-4 bg-gray-300 rounded-full' : 'py-2 px-4'
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
            </NavLink>
        </div>
    </>
  )
}

export default AccountNav