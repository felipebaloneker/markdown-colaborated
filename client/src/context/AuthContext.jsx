import {useState,useEffect } from "react"
import { createContext } from "react"


export const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user,setUser] = useState([])
    useEffect(()=>{
        setUser({
            name:localStorage.getItem('name')
        })
    }, [])

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
