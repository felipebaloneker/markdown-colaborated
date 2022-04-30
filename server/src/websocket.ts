import { io } from "./http";

interface IUsers {
  socket_id: string;
  name:string;
}
interface IDocument {
  body: string;
  updatedAt: Date
}

const users: IUsers[] =[]
const document: IDocument[] = []

io.on('connection', socket => {
    socket.on("add_user",(data)=>{
      const userInRoom = users.find((user)=> user.name === data.name);
      if(userInRoom){
        userInRoom.socket_id = socket.id;
      }
      else{
        users.push({
          name:data.name,
          socket_id:socket.id,
        })
      }
      console.log(users);
    })
    socket.on("document",(data)=>{
      const text: IDocument = {
            body: data.body,
            updatedAt: new Date(),
      }
      document.push(text)
      io.emit("document",text)
    })
  })