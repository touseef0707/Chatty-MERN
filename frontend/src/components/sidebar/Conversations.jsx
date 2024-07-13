import React from 'react'
import useGetConversations from '../../hooks/useGetConversations';
import Conversation from './Conversation.jsx';

const Conversations = () => {

    const {loading, conversations} = useGetConversations();

    return (
        <div className="conversations mb-10 cursor-pointer overflow-y-auto custom-scrollbar">
            {conversations.map((conversation, idx) => (
                <Conversation 
                key={conversation._id} 
                conversation={conversation} 
                lastIdx={idx === conversations.length-1} 
                />
            ))}
            {loading && <span className="loading loading-spinner mx-auto"></span>}
        </div>


    )
}

export default Conversations
