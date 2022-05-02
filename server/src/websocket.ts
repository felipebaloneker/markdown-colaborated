import { io } from "./http";

interface IUsers {
  socket_id: string;
  name:string;
  room:string;
}
interface IDocument {
  id:string;
  body: string;
  updatedAt: Date
}

const users: IUsers[] =[]
const document: IDocument[] = []

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
        io.in(data.room).emit("select_room",users)
    });

    socket.on("create_room",(data)=>{
      const text: IDocument = {
            id: data.id,
            body: data.body,
            updatedAt: new Date(),
      }
      document.push(text)
      io.in(data.id).emit("document",text)
    });

    socket.on("document",(data)=>{
      const find = document.find(
        (doc)=> doc.id === data.id
      )
      if(find){
        console.log(document)
        io.in(data.room).emit("document")
      }
      // const text:IDocument ={
      //   body:data.body,
      //   updatedAt: new Date(),
      // }
    })
  })