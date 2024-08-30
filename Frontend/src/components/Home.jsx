import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom';

function Home() {
    const [places, setPlaces] = useState([]);
    useEffect(()=>{
        axios.get('/places')
        .then(res => {
            setPlaces([...res.data, ...res.data, ...res.data, ...res.data])
        })
        
    },[])
  return (
    <>
    <div className='px-6 py-3 mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1'>
        {
            places.length > 0 && places.map(place => (
                <Link to={'/places/' + place._id} 
                // key lagani h
                className='rounded-2xl'>
                    {/* TODO: page bnana h for visit to see details of the place */}
                    <div className='bg-gray-500 rounded-2xl flex'>
                        {place.photos?.[0] && (
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/temp/`+ place.photos[0]} className='rounded-2xl object-cover aspect-square'/>
                        )}
                    </div>
                    <div className='mt-3 flex flex-col'>
                        <h2 className='text-sm truncate'>
                            {place.title}
                        </h2>
                        <h3 className='font-bold'>
                            {place.address}
                        </h3>
                        <h3 className='text-sm truncate'>
                            {place.description}
                        </h3>
                        <h3 className='mt-1 text-sm'>
                            <span className='font-bold'>${place.price}</span> per night
                        </h3>
                    </div>
                </Link>
            ))
        }
    </div>
    </>
  )
}

export default Home