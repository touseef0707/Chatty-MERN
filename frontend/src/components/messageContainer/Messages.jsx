import React, {useEffect, useRef} from 'react';
import useGetMessages from '../../hooks/useGetMessages';
import Message from './Message.jsx';
import MessageSkeletons from '../../components/skeletons/MessageSkeletons.jsx';
import useListenMessages from '../../hooks/useListenMessages.js';

// Messages: A sub-component of Message Container to display Chats and Messages
const Messages = () => {

    // Get loading and messages state from useGetMessages hook
    const { loading, messages } = useGetMessages();

    useListenMessages();    // useListenMessages hook for incoming messages
    const lastMessageRef = useRef();    // Track last message

    /* using ref to scroll to the last message on opening a new chat,
    this is basically done by listening to changes in messages state */
    useEffect(() => {
            setTimeout(() =>{
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100)
    }, [messages]);


    return (
        <div className="messages overflow-y-auto mb-10">
            {messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeletons key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Messages;
