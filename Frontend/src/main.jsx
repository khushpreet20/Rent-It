import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Profile from './components/Profile.jsx'
import Bookings from './components/Bookings.jsx'
import MyAccommodation from './components/MyAccommodation.jsx'
import Places from './components/PlaceForm.jsx'
import Home from './components/Home.jsx'
import PlacePage from './components/PlacePage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path:'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'profile',
        element: <Profile/>,
        // children: [
        //   {
        //     path:'booking',
        //     element: <Booking/>
        //   },
        //   {
        //     path: 'accommodation',
        //     element: <MyAccommodation/>,
        //     children: [
        //       {
        //         path: 'newplace',
        //         element: <MyAccommodation/>
        //       }
        //     ]
        //   }
        // ]
      },
      {
        path: 'profile/booking', 
        element: <Bookings/>
      },
      {
        path: 'profile/accommodation', 
        element: <MyAccommodation/>,
        // children:[
        //   {
        //     path: 'profile/accommodation/newplace', 
        //     element: <Places/>
        //   },
        // ]
      },
      {
        path: 'profile/accommodation/newplace', 
        element: <Places/>
      },
      {
        path: 'profile/accommodation/:id',
        element: <Places/>
      },
      {
        path: 'places/:id',
        element: <PlacePage/>
      }
      // {
      //   path: 'profile/:subpage?/:action?',
      //   element: <Profile/>
      // }
      // {
      //   path: 'mybooking',
      //   element: <Booking/>
      // },
      // {
      //   path: 'myaccommodation',
      //   element: <Booking/>
      // }

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>

    {/* </RouterProvider> */}
    {/* <App /> */}
  </React.StrictMode>,
)
