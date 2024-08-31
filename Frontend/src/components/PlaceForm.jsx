import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, Navigate, useParams } from 'react-router-dom'
import AccountNav from './AccountNav.jsx';
function Places() {
    const {id} = useParams();
    const[title, setTitle] = useState('');
    const[address, setAddress] = useState('');
    const[photos, setPhotos] = useState([]);
    const[description, setDescription] = useState('');
    const[perks, setPerks] = useState([]);
    const[extraInfo, setExtraInfo] = useState('');
    const[checkintime, setCheckInTime] = useState('');
    const[checkouttime, setCheckOutTime] = useState('');
    const[maxGuest, setMaxGuest] = useState(1);
    const[redirect, setRedirect] = useState(false);
    const[price, setPrice] = useState(100);

    useEffect(() => {
        if(!id){
            return 
        }
        axios.get('/user-places/'+id)
        .then(res => {
            const {data} = res;
            setTitle(data.title)
            setAddress(data.address)
            setDescription(data.description)
            setPhotos(data.photos)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckInTime(data.checkIn)
            setCheckOutTime(data.checkOut)
            setMaxGuest(data.maxGuest)
        })
    },[id])

    const addPhotos = (e) => {
        // e.preventDefault();
        const files = e.target.files;
        // console.log("files", files);
        
        const data = new FormData();
        for (let index = 0; index < files.length; index++) {
            data.append('photos', files[index]);
        }
        // for (let pair of data.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        // console.log(data);
        
        axios.post('/upload', data, {
            withCredentials: true,
            headers: {'Content-type': 'multipart/form-data'}
        })
        .then(res => {
            // const {data: filename} = res;
            const data = res.data;
            // console.log("data", res.data);
            setPhotos((prv)=>(
                [...prv, data]
            ))
        })

    }

    const handleCbClick = (e) => {
        const {name, checked} = e.target;
    
        if(checked){
            setPerks((prevPerks) => [...prevPerks, name]); 
        }else{
            setPerks((prevPerks) => [...prevPerks.filter(selectedName => selectedName !== name)]);
        }
    };
    
    // Log perks whenever it changes
    // useEffect(() => {
    //     console.log("Updated perks:", perks);
    //     console.log("len", perks.length);
    // }, [perks]); // This effect will run every time `perks` changes
    
    const addnewPlaces = (e) => {
        e.preventDefault();
        const data = {title, address, photos: photos.flat(), description, perks, extraInfo, checkintime, checkouttime, maxGuest, price};
        if(id){
            // update
            axios.put('/user-places/'+id, {id, ...data}, {
                withCredentials: true
            })
            .then((res) => {
                console.log(res)
                setRedirect(true)
            })
        }
        else{
            // newplace
            // console.log(data);
            axios.post('/user-places', data, {
                withCredentials: true
            })
            .then((res) => {
                console.log(res)
                setRedirect(true)
            })
        }
    }

    const removePhoto = (e, photoname) => {
        e.preventDefault();
        setPhotos([...photos.filter(photo => photo !== photoname)]);
    }

    const changeHeroPhoto = (e, photoname) => {
        e.preventDefault();
        setPhotos([photoname, ...photos.filter(photo => photo !== photoname)])
    }
    if(redirect){
        return <Navigate to = '/profile/accommodation'/>
    }
    return (
        <>
        <AccountNav/>
        <div className='flex flex-col justify-between items-center lg:max-w-screen-lg max-w-lg mx-auto gap-3'>
            <div className='flex flex-col w-full p-4 mt-2'>
                <form className='flex flex-col gap-4' onSubmit={addnewPlaces}>
                    <label className='text font-bold' htmlFor ="title">Title</label>
                    <input className='w-full border my-2 py-2 px-3 rounded-full'
                    value = {title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Add Title' name='title' id='title'/>
                    <label className='text font-bold' htmlFor="address">Address</label>
                    <input className='w-full border my-2 py-2 px-3 rounded-full'
                    value = {address} onChange={(e)=>setAddress(e.target.value)} type="text" placeholder='Address' name='address' id='address'/>
                    <label className='text font-bold' htmlFor="text">Photos</label>
                    <div className='grid gap-2 grid-cols-3 lg:grid-cols-3 md:grid-cols-3 justify-center items-center'>
                        {photos.length > 0 && photos.map((photo) => (
                            <div className='flex relative aspect-[2/1]'
                                key={photo}>
                                <img className='rounded-2xl w-full object-cover' src={photo} alt="" />
                                <button onClick={(e) => removePhoto(e,photo)}
                                className='absolute text-white bg-black bg-opacity-50 rounded-md py-1 px-1 bottom-1 right-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                                <button onClick={(e) => changeHeroPhoto(e,photo)}
                                className='absolute text-white bg-black bg-opacity-50 rounded-md py-1 px-1 bottom-1 left-1'>
                                    {
                                        photo !== photos[0] ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        : 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                        </svg>

                                    }
                                </button>
                            </div>
                        ))}
                    <label
                    className='flex items-center justify-center bg-transparent border-2 size-12 rounded-md font-bold hover:bg-gray-200 cursor-pointer'>
                        <p>+</p>
                        <input type="file" multiple className='hidden' onChange={addPhotos}/>
                    </label>
                    </div>
                        <label htmlFor="description" className='font-bold'>Description</label>
                            <textarea className='w-full border-2 my-2 py-2 px-3 rounded-xl'
                            value={description} onChange={(e)=>setDescription(e.target.value)} 
                            name="description" id="description" rows="5"></textarea>

                        <label htmlFor="perks" className='font-bold'>Perks</label>
                            <div className='grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
                                <label className='border p-4 flex rounded-md items-center cursor-pointer gap-2'>
                                    <input onChange={handleCbClick} checked = {perks.includes('WiFi')}
                                    value={perks} type="checkbox" name="WiFi" id="" /> 
                                    <span>WiFi</span>
                                </label>
                                <label className='border p-4 flex rounded-md items-center cursor-pointer gap-2'>
                                    <input onChange={handleCbClick} checked = {perks.includes('Parking Spot')}
                                    value={perks} type="checkbox" name="Parking Spot" id="" /> 
                                    <span>Parking Spot</span>
                                </label>
                                <label className='border p-4 flex rounded-md items-center cursor-pointer gap-2'>
                                    <input onChange={handleCbClick} checked = {perks.includes('TV')}
                                    value = {perks} type="checkbox" name="TV" id="" /> 
                                    <span>TV</span>
                                </label>
                                <label className='border p-4 flex rounded-md items-center cursor-pointer gap-2'>
                                    <input onChange={handleCbClick} checked = {perks.includes('Bed')}
                                    value = {perks} type="checkbox" name="Bed" id="" /> 
                                    <span>Bed</span>
                                </label>
                                <label className='border p-4 flex rounded-md items-center cursor-pointer gap-2'>
                                    <input onChange={handleCbClick} checked = {perks.includes('AC')}
                                    value = {perks} type="checkbox" name="AC" id="" /> 
                                    <span>AC</span>
                                </label>
                                <label className='border p-4 flex rounded-md items-center cursor-pointer gap-2'>
                                    <input onChange={handleCbClick} checked = {perks.includes('Private Entrance')}
                                    value={perks} type="checkbox" name="Private Entrance" id="" /> 
                                    <span>Private Entrance</span>
                                </label>

                                {/* <label className='flex'>
                                    <input type="checkbox" name="" id="" /> 
                                    <span>Free Parking</span>
                                </label> */}
                            </div>

                            <label htmlFor="extra_info" className='font-bold'>Extra Info</label>
                            <textarea value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)} className='w-full border-2 my-2 py-2 px-3 rounded-xl'
                            name="extra_info" id="extra_info" rows="3"></textarea>

                            <h3 className='font-bold'>Check in&out times</h3>
                            <div className='grid grid-cols-3 sm:grid-col-2 gap-4'>
                                <div className='flex flex-col'>
                                    <label htmlFor="checkintime">CheckIn Time</label>
                                    <input value={checkintime} onChange={(e)=>setCheckInTime(e.target.value)} placeholder='14:00' className='w-full border my-2 py-2 px-3 rounded-full' type='time' name="checkintime" id="checkintime" />
                                </div>
                                
                                <div className='flex flex-col'>
                                    <label htmlFor="checkouttime">CheckOut Time</label>
                                    <input value={checkouttime} onChange={(e)=>setCheckOutTime(e.target.value)} placeholder='12:00' className='w-full border my-2 py-2 px-3 rounded-full' type="time" name="checkouttime" id="checkouttime" />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="guests">Number of Guests</label>
                                    <input className='w-full border my-2 py-2 px-3 rounded-full'
                                    value = {maxGuest} onChange={(e)=>setMaxGuest(e.target.value)} placeholder='5' type="number" name="guests" id="guest" />
                                </div>
                            </div>
                            <label htmlFor = "price" className='font-bold'>Price</label>
                            <input value={price} onChange={(e) => setPrice(e.target.value)}
                            className='w-full border my-2 py-2 px-3 rounded-full' type="number" name="price" id="price" />
                            <button className='bg-primary rounded-2xl text-white font-semibold p-2 mt-3'>Save</button>
                        </form>
                    </div>
        </div>
        </>
    )
}

export default Places