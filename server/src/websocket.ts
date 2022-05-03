import { io } from "./http";
const Documents = require('./models/documents')
const users: IUsers[] = []
const Users = require('./models/users')
interface IUsers {
  socket_id: string;
  name:string;
  room:string;
}
interface IDocument {
  body: string;
  updatedAt: Date
}


io.on('connection', socket => {

    socket.on("select_room",(data)=>{
      socket.join(data.room)
      const userInRoom = users.find(
        (user)=> user.name === data.name && user.room === data.room);
        if(userInRoom){
          userInRoom.socket_id = socket.id;
        }
        else{
          users.push({
            name:data.name,
            socket_id:socket.id,
            room:data.room,
          })
        }
        const usersIn = users.filter(user => user.room === data.room)
        io.in(data.room).emit("select_room",usersIn)
    });

    socket.on("create_room",()=>{
      //criando instancia
      const document = new Documents({
        body:'',
        updatedAt: new Date,
      })
      document.save().then(()=>{
        console.log('Document'+document)
        socket.emit('create_room',document)
      })

    });

    socket.on("document",async (data)=>{
      let body = [];
      const find = await Documents.findOne({
        _id:data.id
      }).then((res)=>{
        socket.emit('document',res)
      })
      
      if(find){
        io.in(data.id).emit("document",body)
      }
    })
    socket.on("change_document",async (data)=>{
      console.log('body:'+data.body)
      Documents.updateOne({_id:data.id},{
        $set:{
          body:data.body,
          updatedAt:new Date
        }
      })
    })
  })