import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'

function Login() {  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext)
    const login = async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post('/login',{
                email,
                password
            }, {
                withCredentials: true
            })
            setUser(res.data.data.user);
            // .then((res)=>{
            //     // console.log(res.data.data.user);
            //     const {setUser} = useContext(UserContext)
            //     setUser(res.data.data.user)
            //     return res;
            // })
            // alert('Login Successfull')
            // console.log(loggedInuser.data.user);
            
            setRedirect(true)
        } catch (error) {
            alert('Unable to login. Please try again later')
        }
    }

    if(redirect){
        return <Navigate to = {'/'}/>
    }
  return (
    <>
        <div className='px-6 py-8 mx-auto'>
            <h1 className='font-bold text-3xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto p-4 border-2 rounded-2xl'
            action="#" method="post">
                <div>
                    <label htmlFor="email" className="flex mb-2 text-sm font-medium py-2 px-3 text-gray-700">Email</label>
                    <input onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    value={email}
                    className='w-full border my-2 py-2 px-3 rounded-full'
                    type="email" placeholder='your@email.com' />
                </div>
                <div>
                    <label htmlFor="password" className="flex mb-2 text-sm font-medium px-3 py-2 text-gray-900">Password</label>
                    <input onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    value = {password}
                    className='w-full border my-2 py-2 px-3 rounded-full'
                    type="password" placeholder='password' />
                </div>
                <div>
                    <p className="px-3 py-4 text-sm font-light text-gray-500 ">
                        Don’t have an account yet? 
                        <Link 
                            to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up
                        </Link>
                    </p>
                    <button onClick={login}
                    className='bg-primary w-full rounded-full p-2 text-white'>Login</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default Login