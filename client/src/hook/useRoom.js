import { useEffect,useState,useRef } from "react"
import io from 'socket.io-client';

export function useRoom(){
    const [room,setRoom] = useState('')
    
    useEffect(()=>{
        const socket = io.connect('http://localhost:4000');
        socket.emit('create_room',{
        })
        socket.on('create_room',(data) =>{
            setRoom({
                id:data._id,
                body:data.body,
                updatedAt:data.updatedAt,
            })
        })
        return () => socket.disconnect()
    },[])
    return {room}
}