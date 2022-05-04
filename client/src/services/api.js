import io from 'socket.io-client';

export default {
  logout:async()=>{
    localStorage.clear()
  },
  loginInDocument: async(name,room)=>{
    const socket = await io.connect('http://localhost:4000');
    socket.emit('select_room',{
      name,
      room
     })
  },

}