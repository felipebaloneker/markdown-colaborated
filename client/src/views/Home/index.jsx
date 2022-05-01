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
    const socketRef = useRef()

    console.log("view:"+users)
    return(
       <div className="page">
           <div className="header">
               <div className='username'>
                    <p>Olá, {user.name}</p>
               </div>
               <div>
                   <p>View</p>
                    <span>{users}</span>
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
                        <textarea name="text-area"
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