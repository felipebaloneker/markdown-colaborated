import { useEffect,useState } from "react"
import io from 'socket.io-client';

export function useView(){
    const [users,setUsers] = useState()
    
    useEffect(()=>{
        const socket = io.connect('http://localhost:4000');
       const timer = setInterval(()=>{
        socket.emit('select_room',{
            name:localStorage.getItem('name'),
            room:localStorage.getItem('room')
        })
        socket.on('select_room',(data) =>{
           setUsers(data)
        })
       },1000)
        return () => clearInterval(timer)
    },[])
    return {users}
}