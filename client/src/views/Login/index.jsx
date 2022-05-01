import io from 'socket.io-client';
import {useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../hook/useAuth';
import './styles.scss'

function Login(){
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const navigate = useNavigate()
    const {user,setUser} = useAuth()

    const loginInDocument=(e)=>{
      e.preventDefault()
      localStorage.setItem('name', name)
      setUser({
        name:localStorage.getItem('name')
      })
      const socket = io.connect('http://localhost:4000');
      socket.emit('select_room',{
        name,
        room
       })

      navigate(`/markdown/${room}`)
    }
    const createDocument=(e)=>{
      e.preventDefault()
      setUser({
        name:localStorage.getItem('name')
      })

      navigate(`/markdown`)
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