const mongoo = require('mongoose');

const UserSchema = new mongoo.Schema({
    socket_id:{
        type:String,
        require:true,
        unique:true,
    },
    name:{
        type:String,
        require:true,
    },
    room:{
        type: String,
        require:true,
    }
})

const Users = mongoo.model('Users', UserSchema)

module.exports = Users;