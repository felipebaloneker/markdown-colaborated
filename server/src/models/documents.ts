import { mongoose } from "../database";

const DocumentSchema = new mongoose.Schema({
    body:{
        type:String,
        require:true,
    },
    updatedAt:{
        type: Date,
        default:Date.now,
    }
})

const Documents = mongoose.model('Documents', DocumentSchema)

module.exports = Documents;