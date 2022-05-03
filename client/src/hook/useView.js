import { useEffect,useState,useRef } from "react"
import io from 'socket.io-client';

export function useView(){
    const [users,setUsers] = useState()
    
    useEffect(()=>{
        const socket = io.connect('http://localhost:4000');
        socket.emit('select_room',{
            name:localStorage.getItem('name'),
            room:localStorage.getItem('room')
        })
        socket.on('select_room',(data) =>{
            console.log(data)
           setUsers(`${data.length}`)
        })
        return () => socket.disconnect()
    },[])
    return {users}
}