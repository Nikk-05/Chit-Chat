import mongoose,{Schema} from 'mongoose'

const chatSchema = new Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message:{
        type: String,
    },
    image:{
        type: String,
        default: ""
    }
},{timestamps:true})

const Chat = mongoose.model('Chat', chatSchema);
export default Chat
