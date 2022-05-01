import { useEffect,useState } from "react"
import io from 'socket.io-client';

export function useView(){
    const [view,setView] = useState([])
    useEffect(()=>{
        const socket = io.connect('http://localhost:4000');
        socket.on('select_room',(data)=>{
            return data
        })
        return setView(socket)
    })
    return {view}
}