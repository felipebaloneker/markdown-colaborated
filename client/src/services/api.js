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

  createDocument: async()=>{
    const socket = io.connect('http://localhost:4000');
    let room = []
    socket.emit('create_room')
    socket.on('create_room',(data) =>{
      room.push({
          id:data._id,
          body:data.body,
          updatedAt:data.updatedAt,
      })
    }) 
     return room
    }

}