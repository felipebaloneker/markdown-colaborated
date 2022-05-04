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
    const textRef = useRef()
    //changing document
    const changeText=(e)=>{
        const socket = io.connect('http://localhost:4000');
        socket.emit('change_document',{
            id:code,
            body:e
        })
        setText(e)

    }
    // geting cursor position
    useEffect(()=>{
        textRef.current.addEventListener('keyup', e => {
            console.log('Cursor Position: ', e.target.selectionStart)
          })
    })
    //geting document changes
    useEffect(()=>{
            const socket = io.connect('http://localhost:4000');
            const timer = setInterval(()=>{
                socket.emit('document',{
                    id:code 
                })
                socket.on('document',data =>{
                   return setText(data.body)
                })
            },1000)
            return ()=> clearInterval(timer)
        },[])

    return(
       <div className="page">
           <div className="header">
               <div className='username'>
                    <p>Olá, {user.name}</p>
               </div>
               <div className='room_view'>
                    <span>
                        View:
                        {users? users.length : ''}
                    </span>
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
                        ref={textRef}
                        className='lined-area'
                        autoFocus
                        value={text}
                        onChange={(e)=>{changeText(e.target.value)}}
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