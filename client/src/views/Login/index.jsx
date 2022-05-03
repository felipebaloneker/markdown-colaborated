import {useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './styles.scss'
import api from '../../services/api';
import {useAuth} from '../../hook/useAuth';
import io from 'socket.io-client';

function Login(){
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const navigate = useNavigate()
    const {setUser} = useAuth()

    const loginInDocument=(e)=>{
      e.preventDefault()
      api.loginInDocument(name,room)
      api.logout()
      localStorage.setItem('name', name)
      localStorage.setItem('room', room)
      setUser({
        name:localStorage.getItem('name'),
        room:localStorage.getItem('room')
      })
      navigate(`/markdown/${room}`)
    }

    const createDocument=async (e)=>{
      e.preventDefault()
      api.createDocument().then()
      setUser({
        name:localStorage.getItem('name'),
        room:localStorage.getItem('room')
      })
      navigate(`/markdown/${localStorage.getItem('room')}`)
    }

    return (
      <div className="login">
        <div className='render'>
          <div className='container'>
            <div className="title">
              <h2>MarkDown</h2>
            </div>
            <form className="container_wrp" onSubmit={createDocument}>
                <label>Digite seu Nome:</label>
                <input type='text' name='nome' placeholder='nome'
                required
                onChange={(e) => setName(e.target.value)}
                />
                <button
                onClick={createDocument}
                >Criar um Documento</button>
            </form>
          </div>
          <div className="container">
            <div className="subtitle">
                <h2>Colaborativo</h2>
            </div>
            <form className="container_wrp last" onSubmit={createDocument}>
                <label>Digite seu Nome:</label>
                <input type='text' name='nome' placeholder='nome'
                required
                onChange={(e) => setName(e.target.value)}
                />
                <label>Digite o Código do Documento</label>
                <input type='text' name='documento' placeholder='Código do documento'
                onChange={(e) => setRoom(e.target.value)}
                />
              <button
              onClick={loginInDocument}
              >Entrar em um Documento</button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default Login