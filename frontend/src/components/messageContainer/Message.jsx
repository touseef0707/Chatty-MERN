import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

// Message component that will display a chat that's sent or received
const Message = ({ message }) => {

    const { authUser } = useAuthContext();  // Get authenticated user
    const { selectedConversation } = useConversation();     // Get selected conversation from hook
    const fromMe = message.sender === authUser._id;     // compare sender with authenticated user

    const chatClassName = fromMe ? "chat-end" : "chat-start";   // set classname for message
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";      // Set bubble color for message
    const shakeClass = message.shouldShake ? "shake" : "";  // Shake class set in socket upon new message

    const formattedTime = extractTime(message.createdAt);   // format the time

    // Get profile pic based on user
    const profilePic = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Profile' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
}

export default Message;
