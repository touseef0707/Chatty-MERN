import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// MESSAGE Controller: SEND MESSAGE
const sendMessage = async (req, res) => {

    try {

        const { message } = req.body;     // get message from request body
        const { id: receiverID } = req.params;    // get receiverID from request params
        const senderID = req.user._id;      // get senderID from request user

        /* Find the conversation between sender and receiver 
        using participants array in Conversation model */
        let conversation = await Conversation.findOne({
            participants: { $all: [senderID, receiverID] }
        });

        // If conversation does not exist, create a new conversation
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, receiverID],
            });
            // console.log('New conversation created');
        }

        // Create a new message
        const newMessage = new Message({
            message,
            sender: senderID,
            receiver: receiverID,
        });

        // Push the new message to conversation messages array
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // Get the receiver's socket id
        const receiverSocketId = getReceiverSocketId(receiverID);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Send the new message as response
        res.status(201).json(newMessage);

    } catch (error) {
        // console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: 'API Error: sendMessage Controller' });
    }
}

// MESSAGE Controller: GET MESSAGES
const getMessages = async (req, res) => {

    try {

        const { id: userToChatID } = req.params;      // get userToChatID from request params
        const senderID = req.user._id;      // get senderID from request user

        // Find the conversation between sender and receiver
        const conversation = await Conversation.findOne({
            participants: { $all: [senderID, userToChatID] }
        }).populate('messages')         // Populate messages array in conversation

        // If conversation does not exist, return res 'OK' with an empty array
        if (!conversation) {
            return res.status(200).json([])
        }

        // Get messages from conversation
        const messages = conversation.messages;

        res.status(200).json(messages);    // Send the messages as response

    } catch (error) {

        // console.log("Error in getMessages controller: ", error.message)
        res.status(500).json({ error: 'API Error: getMessages Controller' })
    }
}

// Export Controllers
export { sendMessage, getMessages }