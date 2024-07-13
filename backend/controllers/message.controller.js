import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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
            // console.log('New conversation created')
        }
        
        const newMessage = new Message({
            message,
            sender: senderID,
            receiver: receiverID,
        })
        
        if(newMessage) {
            conversation.messages.push(newMessage._id)
        } 

        // await conversation.save();
		// await newMessage.save();
		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverID);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        res.status(201).json(newMessage)


    } catch (error) {
        // console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error: 'API Error: sendMessage Controller'})
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
            return res.status(200).json([])
        }

        const messages = conversation.messages;

		res.status(200).json(messages);
        
    } catch (error) {
        // console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({error: 'API Error: getMessages Controller'})
    }
}

export { sendMessage, getMessages }