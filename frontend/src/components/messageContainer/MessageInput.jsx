import React, { useState } from 'react';
import useSendMessage from '../../hooks/useSendMessage';

// Message Input: A sub-component for message container to send chats.
const MessageInput = () => {

    const [message, setMessage] = useState('');         // Message state for inputs
    
    // get loading state and sendMessage function from useSendMessage hook
    const { loading, sendMessage } = useSendMessage();  

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (message.trim() === '') {
            return; // Don't send empty messages
        }
        await sendMessage(message);
        setMessage(''); // Clear the input after sending the message
    }

    return (
        <div className="absolute bottom-3 w-full">
            <form 
                action="#" aria-label="Search" role="search" 
                className="flex items-center w-full pl-3 bg-slate-800 rounded-full bottomBar bottom-3" id="search-container"
                onSubmit={handleSendMessage}>
                <div className="w-full flex items-center space-x-3">
                    <input 
                        type="text" 
                        placeholder="Type to chat..." 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full flex bg-transparent border-none outline-none text-white placeholder-gray-400" />
                    <button 
                        type='submit' 
                        className="btn border-none bg-red-600 hover:bg-red-800 rounded-full"
                        disabled={loading}>
                        {loading?"":<img src="svg/send.svg" alt="send" />}
                        {loading && <span className="loading loading-spinner mx-auto"></span>}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MessageInput;
