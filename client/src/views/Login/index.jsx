import io from 'socket.io-client'
import {useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../hook/useAuth';

function Login(){
    const [name,setName] = useState('')
    const navigate = useNavigate()
    const {user,setUser} = useAuth()
    if(user){
      navigate(`/markdown`)
    }
    const onSubmit=(e)=>{

      e.preventDefault()
      setUser(name)
      // const socket = io.connect('http://localhost:4000');
      // socket.emit('add_user',{
      //   name,
      //  })

      navigate(`/markdown`)
    }
    return (
      <div className="App">
        <div className='render'>
          <form onSubmit={onSubmit}>
              <label>Digite seu Nome:</label>
              <input type='text' name='nome' placeholder='nome'
              required
              onChange={(e) => setName(e.target.value)}
              />
              <button>Entrar</button>
          </form>
        </div>
      </div>
    );
}
export default Login