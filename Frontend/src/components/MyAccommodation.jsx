import React, { useEffect, useState } from 'react'
import AccountNav from './AccountNav.jsx'
import { Link } from 'react-router-dom'
import Places from './PlaceForm.jsx'
import axios from 'axios'
function MyAccommodation() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/user-places', {withCredentials: true})
    .then(({data}) => {
      setPlaces(data);
    })
  },[])
  return (
    <>
      <AccountNav/>
      <div className='flex flex-col justify-between items-center max-w-screen-lg mx-auto gap-3'>
            <Link
            to = '/profile/accommodation/newplace'
            className = "bg-primary text-white py-2 px-6 rounded-full flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new Place
            </Link>
            {places.length > 0 && places.map((place) => (
                <Link to={'/profile/accommodation/' + place._id}
                key={place.title}
                className='flex bg-gray-200 p-4 rounded-2xl gap-4 w-full  min-h-32'>
                  <div className='flex bg-gray-300 rounded-2xl w-60'>
                    {place.photos.length > 0 && (
                        <img className='rounded-2xl object-cover w-full' src={place.photos[0]} alt="first_photo" />
                    )}
                  </div>
                  <div className='grow-0 shrink'>
                    <h2 className='text-2xl'>{place.title}</h2>
                    <p className='text-sm mt-2'>{place.description}</p>
                  </div>
                </Link>
            ))}
            {/* <Place/> */}
        </div>
    </>
  )
}

export default MyAccommodation