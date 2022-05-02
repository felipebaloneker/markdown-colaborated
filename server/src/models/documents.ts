const mongo = require('mongoose');

const DocumentSchema = new mongo.Schema({
    id:{
        type:String,
        require:true,
        unique:true,
    },
    body:{
        type:String,
        require:true,
    },
    updatedAt:{
        type: Date,
        default:Date.now,
    }
})

const Documents = mongo.model('Documents', DocumentSchema)

module.exports = Documents;