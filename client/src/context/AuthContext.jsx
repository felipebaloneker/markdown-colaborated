import {useState,useEffect } from "react"
import { useParams } from 'react-router';
import { createContext } from "react"
import io from 'socket.io-client';


export const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user,setUser] = useState([])

    useEffect(()=>{
        const socket = io.connect('http://localhost:4000');
        socket.emit('select_room',{
            name:localStorage.getItem('name'),
            room:localStorage.getItem('room')
         })
        setUser({
            name:localStorage.getItem('name'),
            room:localStorage.getItem('room')
        })

    }, [])

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
