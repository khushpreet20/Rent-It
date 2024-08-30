import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {differenceInCalendarDays} from 'date-fns'
import { UserContext } from '../context/UserContext';

// TODO : Photos wale section mai large screen ke liye grids increase kr de and booking functionality implement krde
function PlacePage() {
    const {id} = useParams();
    const{user} = useContext(UserContext)
    // console.log(id);
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    const [place, setPlace] = useState({})
    useEffect(()=>{
        if(!id){
            return;
        }

        axios.get('/user-places/'+id)
        .then(res =>{ 
            // console.log(res.data);
            setPlace(res.data)
        })
    }, [id]);
    
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guest, setGuest] = useState(1);
    const [your_name, setYour_Name] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    let nights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

    const BookPlace = (e) => {
        e.preventDefault();
        let finalPrice = nights * place.price;
        if(!user){
            // return <Navigate to='/login'/>
            setRedirect('/login')
            return 
        }
        if(!nights || !guest || !your_name || !phone){
            alert('Please Write valid values in the field')
            return
        }
        const data = {id, checkIn, checkOut, guest, your_name, phone, finalPrice};
        // console.log(data);
        
        axios.post('http://localhost:2004/bookings', data, {withCredentials: true})
        .then(res => {
            setRedirect(`/profile/booking`)
        })
    }
    
    const handleshowallphotos = (e) => {
        e.preventDefault()
        setShowAllPhotos(true);
    }

    // if(showAllPhotos){
    //     return (
    //         <div className='inset-0 bg-black bg-opacity-20 w-screen h-screen backdrop-blur-sm fixed flex justify-center items-center'>
    //             <div className='w-4/5 h-screen mt-8 overflow-y-scroll bg-gray-300 grid gap-2'>
    //                 <button onClick = {(e) => {
    //                     e.preventDefault();
    //                     setShowAllPhotos(false)
    //                 }} 
    //                 className='fixed bg-gray-950 text-white shadow shadow-black py-1 px-2 font-semibold rounded-sm'>
    //                     Close
    //                 </button>
    //                 {place?.photos?.length > 0 && place.photos.map(photo => (
    //                     <div className='p-8'
    //                     key={photo}>
    //                         <img className = 'w-full h-full object-cover' src={`${import.meta.env.VITE_API_BASE_URL}/temp/`+ photo} alt="" />
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }

    if(redirect){
        return <Navigate to = {redirect}/>
    }
  return (
    <>
        <div className='mt-8 px-6 py-3 flex flex-col justify-center items-center'>
            <div className='max-w-screen-lg'>
                <h1 className='text-3xl'>{place.title}</h1>
                <div className='flex gap-1 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                    <a className='my-2 block font-semibold underline' target = '_blank' href={'https://maps.google.com/?q='+place.address}>{place.address}</a>
                </div>
                <div className='relative grid rounded-2xl gap-2 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_1fr]'>
                    <div className='flex rounded-2xl'>
                            {place.photos?.[0] && (
                                <img onClick={() => setShowAllPhotos(true)} className='hover:bg-black cursor-pointer hover:opacity-50
                                rounded-l-2xl aspect-square object-cover' src={`${import.meta.env.VITE_API_BASE_URL}/temp/`+ place.photos[0]} alt="" />
                            )}
                        {/* <div>
                        </div> */}
                    </div>
                    <div className='rounded-2xl grid gap-2'>
                        {place.photos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} className='hover:bg-black cursor-pointer hover:opacity-50 aspect-square object-cover' src={`${import.meta.env.VITE_API_BASE_URL}/temp/`+ place.photos[0]} alt="" />
                        )}
                        {place.photos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} className='hover:bg-black cursor-pointer hover:opacity-50 aspect-square object-cover' src={`${import.meta.env.VITE_API_BASE_URL}/temp/`+ place.photos[0]} alt="" />
                        )}
                    </div>
                    <div className='rounded-2xl grid gap-2'>
                        {place.photos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} className='hover:bg-black cursor-pointer hover:opacity-50
                            rounded-tr-2xl aspect-square object-cover' src={`${import.meta.env.VITE_API_BASE_URL}/temp/`+ place.photos[0]} alt="" />
                        )}
                        {place.photos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} className='hover:bg-black cursor-pointer hover:opacity-50
                            rounded-br-2xl aspect-square object-cover' src={`${import.meta.env.VITE_API_BASE_URL}/temp/`+ place.photos[0]} alt="" />
                        )}
                    </div>
                    <button onClick={(e) => handleshowallphotos(e)}
                    className='absolute flex gap-1 justify-center items-center font-semibold bottom-2 right-2 p-2 bg-gray-200 rounded-xl shadow-md shadow-gray-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z" clipRule="evenodd" />
                        </svg>
                        <span>Show more photos</span>
                    </button>
                </div>

                {showAllPhotos && (
                    <div className='inset-0 bg-black bg-opacity-20 w-screen h-screen backdrop-blur-sm fixed flex justify-center items-center'>
                        <div className='w-4/5 h-5/6 m-8 overflow-y-scroll bg-black grid gap-3 text-white'>
                            <div className='flex fixed w-4/5 justify-end items-center py-2 px-8'>
                                {/* <span>{place.title}</span> */}

                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setShowAllPhotos(false)
                                }} 
                                className='flex gap-1 bg-gray-600 text-white shadow-md shadow-gray-800 py-1 px-2 font-semibold rounded-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                </svg>
                                    Close
                                </button>
                            </div>
                            {place?.photos?.length > 0 && place.photos.map(photo => (
                                <div className='px-8'
                                key={photo}>
                                    <img className = 'w-full h-full object-cover' src={`${import.meta.env.VITE_API_BASE_URL}/temp/`+ photo} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                <div className='grid grid-cols-1 gap-2 md:grid-cols-[2fr_1fr] lg:grid-cols-[5fr_3fr] my-4'>
                    <div>
                        <div className='mb-4'>
                            <h2 className='font-semibold text-2xl'>
                                Description
                            </h2>
                            <p>
                                {place.description} 
                            </p>
                        </div>
                        <p>Check-in: {place.checkintime}</p>
                        <p>Check-Out: {place.checkouttime}</p>
                        <p>Max Guest: {place.maxGuest}</p>
                    </div>
                    
                    <div>
                        <div className='bg-white shadow-2xl p-4 rounded-2xl flex flex-col gap-3'>
                            <div className= 'text-2xl text-center'>
                                Price: ${place.price} / per night
                            </div> 
                            <div className='grid grid-rows-[auto_auto] grid-cols-2 gap-2'>
                                <div className='border shadow-lg py-2 px-4 rounded-lg'>
                                    <label htmlFor="">Check In: </label>
                                    <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                                    type="date" name="" id="" />
                                </div>
                                <div className='border shadow-lg py-2 px-4 rounded-lg'>
                                    <label htmlFor="">Check Out: </label>
                                    <input value = {checkOut} onChange={(e) => setCheckOut(e.target.value)} 
                                    type="date" name="" id="" />
                                </div>
                                <div className='border flex justify-evenly items-center shadow-lg py-2 px-4 rounded-lg col-span-2'>
                                    <label htmlFor="">Number of Guests: </label>
                                    <input value={guest} onChange={(e) => setGuest(e.target.value)}
                                    className = 'border my-2 py-2 px-3 rounded-full ' type="number" name="" id="" />
                                </div>
                                {
                                    nights > 0 && (
                                        <>
                                            <div className='border flex justify-evenly items-center shadow-lg py-2 px-4 rounded-lg col-span-2'>
                                                <label htmlFor="">Your Full Name: </label>
                                                <input value={your_name} onChange={(e) => setYour_Name(e.target.value)}
                                                className = 'border my-2 py-2 px-3 rounded-full ' type="text" placeholder='Khush'/>
                                            </div>

                                            <div className='border flex justify-evenly items-center shadow-lg py-2 px-4 rounded-lg col-span-2'>
                                                <label htmlFor="">Phone Number: </label>
                                                <input value={phone} onChange={(e) => setPhone(e.target.value)}
                                                className = 'border my-2 py-2 px-3 rounded-full ' type="tel"/>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <button onClick={(e) => BookPlace(e)} 
                            className='bg-primary text-white p-2 rounded-lg w-full'>
                                Book this place 
                                {
                                    nights > 0 && (
                                        <span className='pl-2'>${nights * place.price}</span>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='font-semibold text-2xl'>
                        Extra Info
                    </h2>                 
                    <div className='mt-2 mb-4 text-sm text-gray-700 leading-5'>
                        {place.extraInfo}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PlacePage