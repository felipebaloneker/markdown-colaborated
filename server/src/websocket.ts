import { io } from "./http";
const Documents = require('./models/documents')
// const users: IUsers[] = []
const Users = require('./models/users')

io.on('connection', socket => {

    socket.on("select_room", async (data)=>{
      socket.join(data.room)
      const userInRoom = await Users.findOne({
        name:data.name,
        room:data.room
      });
        if(userInRoom){
          userInRoom.socket_id = socket.id;
        }
        else{
          const users = new Users({
            socket_id:socket.id,
            name:data.name,
            room:data.room,
            cursor_position:'0'
          })
          users.save().then(()=>{
            console.log("New User:"+users)
          })
          // users.push({
          //   name:data.name,
          //   socket_id:socket.id,
          //   room:data.room,
          //   cursor_position:'0'
          // })
        }
        await Users.find({
            room:data.room
        }).then((res)=>{
          io.in(data.room).emit("select_room",res)
        })
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
      await Documents.findOne({
        _id:data.id
      })
      .then((res)=>{
        console.log(res)
        socket.emit('document',res)
      })
      await Documents.updateOne({_id:data.id},{
        $set:{
          body:data.body,
          updatedAt:new Date
        }
      })
    })
  })