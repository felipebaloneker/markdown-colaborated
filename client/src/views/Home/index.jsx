import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import {useAuth} from '../../hook/useAuth'
import ReactMarkdown from 'react-markdown';
import './styles.scss'
import { useView } from '../../hook/useView';
import io from 'socket.io-client';

function Home(){
    const params = useParams();
    const code = params.id
    const {user} = useAuth()
    const [text,setText]= useState('')
    const {users} = useView()


    useEffect(()=>{
            let body = []
            const socket = io.connect('http://localhost:4000');
            socket.emit('document',{
                id:code 
            })
            socket.on('document',(data) =>{
               body.push(data)
            })
            console.log(body)
            return () => socket.disconnect()
        })

    return(
       <div className="page">
           <div className="header">
               <div className='username'>
                    <p>Olá, {user.name}</p>
               </div>
               <div className='room_view'>
                    <span>View: {users}</span>
               </div>
               <div className="code">
                   <p>Código:</p>
                   <span>{code}</span>
               </div>
           </div>
           <div className="editor">
               <div className="editor_container">
                <div className="text-area">
                    <div className="toolbar">
                    
                    </div>
                    <div className='text'>
                        <div
                        className='line-numbers'
                        >{}</div>
                        <textarea 
                        id='text'
                        name="text-area"
                        className='lined-area'
                        autoFocus
                        value={text}
                        onChange={(e)=>{setText(e.target.value)}}
                        ></textarea>
                    </div>
                </div>
                <div className="preview">
                    <ReactMarkdown children={text} className='text'/>
                </div>
               </div>
           </div>
       </div>
    )
}
export default Home