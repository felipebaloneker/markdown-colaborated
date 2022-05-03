import { io } from "./http";
const Documents = require('./models/documents')
const users: IUsers[] =[]
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
      // const userInRoom = Users.findOne({where:{
      //     name:data.name,
      //     room:data.room
      //   }})
      // if(userInRoom){
      //   userInRoom.socket_id = socket.id;
      // }
      // else{

      // }
      // const users: IUsers = new Users({
      //   name:data.name,
      //   socket_id:socket.id,
      //   room:data.room
      // })
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
        io.in(data.room).emit("select_room",users)
    });

    socket.on("create_room", async ()=>{
      //criando instancia
      const document = new Documents({
        body:'',
        updatedAt: new Date,
      })
      await document.save(function(err,doc){console.log(err+doc)})

    });

    socket.on("document",(data)=>{
      // const find = document.find(
      //   (doc)=> doc.id === data.id
      // )
      // if(find){
      //   console.log(document)
      //   io.in(data.room).emit("document")
      // }
      // const text:IDocument ={
      //   body:data.body,
      //   updatedAt: new Date(),
      // }
    })
  })