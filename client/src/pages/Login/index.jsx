import io from 'socket.io-client'
import {useState } from 'react';

function Login(){
    const [name,setName] = useState('')

    const onSubmit=(e)=>{
          e.preventDefault()
      const socket = io.connect('http://localhost:4000');
      socket.on('connect', () => {
        console.log(socket.id)
  })
    }
    return (
      <div className="App">
        <div className='render'>
          <form onSubmit={onSubmit}>
              <label>Digite seu Nome:</label>
              <input type='text' name='nome' placeholder='nome'
              onChange={(e) => setName(e.target.value)}
              />
              <button>Entrar</button>
          </form>
        </div>
      </div>
    );
}
export default Login