import { useParams } from 'react-router';
import { useState } from 'react';
import {useAuth} from '../../hook/useAuth'
import ReactMarkdown from 'react-markdown';
import './styles.scss'
import { useView } from '../../hook/useView';

function Home(){
    const {user} = useAuth()
    const params = useParams();
    const [text,setText]= useState('')
    const {view} = useView()
    const code = params.id
    console.log(view)
    return(
       <div className="page">
           <div className="header">
               <div className='username'>
                    <p>Olá, {user.name}</p>
               </div>
               <div>
                   <p>View</p>
                    <span>3</span>
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