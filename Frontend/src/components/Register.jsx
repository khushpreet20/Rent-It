import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate, useAsyncError } from 'react-router-dom'
function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const RegisterUser = async(e)=>{
        e.preventDefault();
        // axios.get('http://localhost:2004/test')
        try {
            await axios.post('/register',{
                username, 
                email,
                password, 
                confirmpassword
            })
    
            alert('Registration Successfull')
            setRedirect(true)
            // directly login krde user ko
            // bhai ne directly login nhi kiya h usne register krne ke baad login kraya h.
            // continue 6:00 a.m.
        } catch (error) {
            alert('Registration failed. Please try again later.')
        }
        
    }

    if(redirect){
        return <Navigate to = {'/'}/>
    }
  return (
    <>
        <div className='px-6 py-3 mx-auto'>
            <h1 className='font-bold text-3xl text-center mb-4'>Sign Up</h1>
            <form className='max-w-md mx-auto p-4 border-2 rounded-2xl'
            action="#" method="post">
                <div>
                    <label htmlFor="text" className="flex mb-2 text-sm font-medium py-2 px-3 text-gray-700">Username</label>
                    <input onChange={(e)=>{
                        setUsername(e.target.value)
                    }}
                    value={username}
                    className='w-full border my-2 py-2 px-3 rounded-full'
                    type="text" placeholder='Enter Username' />
                </div>
                <div>
                    <label htmlFor="email" className="flex mb-2 text-sm font-medium py-2 px-3 text-gray-700">Email</label>
                    <input onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    value={email}
                    className='w-full border my-2 py-2 px-3 rounded-full'
                    type="text" placeholder='Enter email' />
                </div>
                <div>
                    <label htmlFor="password" className="flex mb-2 text-sm font-medium px-3 py-2 text-gray-900">Password</label>
                    <input onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    value={password}
                    className='w-full border my-2 py-2 px-3 rounded-full'
                    type="password" placeholder='password' />
                </div>
                <div>
                    <label htmlFor="confirm_password" className="flex mb-2 text-sm font-medium px-3 py-2 text-gray-900">Confirm Password</label>
                    <input onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                    }}
                    value={confirmpassword}
                    className='w-full border my-2 py-2 px-3 rounded-full'
                    type="password" placeholder='password' />
                </div>
                <div>
                    <p className="px-3 py-2 text-sm font-light text-gray-500 ">
                        Aready have an account? 
                        <Link 
                            to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in
                        </Link>
                    </p>
                    <button onClick={RegisterUser}
                    className='bg-primary w-full rounded-full p-2 text-white'>Register</button>
                </div>
            </form>
        </div>  
    </>
  )
}

export default Register