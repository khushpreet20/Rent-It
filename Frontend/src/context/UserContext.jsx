import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    // const [check, setCheck] = useState(true);
    useEffect(()=>{
        if(!user){
            // can't make a useEffect an async callback so use .then() .catch()
            axios.get('/auth', {withCredentials: true})
            .then(res => {
                // console.log(res);
                if(res.data){
                    setUser(res.data)
                }
            })
            .catch(err => {
                console.log('Error in authentication: ', err);
                
            })
            // .then(res => {
            //     console.log(res);
            //     setUser(res)
            // })
        }
    },[])
    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}
