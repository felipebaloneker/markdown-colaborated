export const mongoose = require('mongoose');
"mongodb://YourUsername:YourPasswordHere@127.0.0.1:27017/your-database-name"
mongoose.connect('mongodb://admin:admin@localhost:27017',{
},(res)=>{
    console.log('Connected on MongoDb:'+res)
});
mongoose.Promise = global.Promise;

module.exports = mongoose;