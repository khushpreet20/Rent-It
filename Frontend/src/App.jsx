import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import Footer from './components/Footer.jsx'
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(import.meta.env.VITE_API_BASE_URL);
axios.defaults.withCredentials = true;


function App() {
  return (
    <>
      <UserContextProvider>
        <Header/>
        <Outlet/>
        <Footer/>
      </UserContextProvider>
    </>
  )
}

export default App
