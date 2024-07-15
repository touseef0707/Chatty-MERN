import React, { useEffect } from 'react';
import { TiMessages } from 'react-icons/ti';
import { useAuthContext } from '../../context/AuthContext.jsx';
import useConversation from '../../zustand/useConversation';
import TitleBar from './TitleBar';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { formatName } from '../../utils/formatName.js';

// Messages Container
const MessagesContainer = () => {

  // Import desired state and methods from useConversation hook
  const { selectedConversation, setSelectedConversation } = useConversation();

  // unmount when not in view
  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation]);

  return (
    <div className='flex flex-col w-full mx-5 py-5 relative'>
      {!selectedConversation ? <NoChatSelected /> : <ChatSelected />}
    </div>
  );
}

// If no conversation is selected, display welcome message.
const NoChatSelected = () => {

  const { authUser } = useAuthContext();  // Get auth user from auth context

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-x1text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p className='text-5xl'>Welcome {formatName(authUser.fullname)}! 👋 </p>
        <p className='text-3xl'>Select a chat to start messaging</p>
        <TiMessages className='text-9xl md:text-6x1 text-center' />
      </div>
    </div>
  );
}

// If Conversation is selected display chats
const ChatSelected = () => {
  return (
    <>
      <TitleBar />

      <Messages />

      <MessageInput />
    </>
  );
}

export default MessagesContainer;