import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverID} = req.params;
        const senderID = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderID, receiverID]}
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, receiverID],
            })
            console.log('New conversation created')
        }
        
        const newMessage = new Message({
            message,
            sender: senderID,
            receiver: receiverID,
        })
        
        if(newMessage) {
            conversation.messages.push(newMessage._id)
        } 

        // SOCKET.IO IMPLEMENTATION


        // await conversation.save()
        // await newMessage.save()

        // run in parallel
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json({newMessage})


    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error: 'Something went wrong'})
    }
}


const getMessages = async (req, res) => {
    try {
        const {id: userToChatID} = req.params;
        const senderID = req.user._id;
        const conversation = await Conversation.findOne({
            participants: {$all: [senderID, userToChatID]}
        }).populate('messages')

        if(!conversation) {
            return res.status(404).json({error: 'No conversation found'})
        }

        res.status(200).json(conversation.messages.map(message => ({
            message: message.message
        })))
        
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({error: 'Something went wrong'})
    }
}

export { sendMessage, getMessages }