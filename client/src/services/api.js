import io from 'socket.io-client';

export default {
  logout:async(room,name)=>{
    localStorage.clear()
    const socket = await io.connect('http://localhost:4000');
    socket.emit('logout_user',{
      room,
      name,
    })
  },
  loginInDocument: async(name,room)=>{
    const socket = await io.connect('http://localhost:4000');
    socket.emit('select_room',{
      name,
      room
     })
  },

}