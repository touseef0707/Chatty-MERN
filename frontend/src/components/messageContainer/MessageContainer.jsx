import React, { useEffect } from 'react'
import TitleBar from './TitleBar'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from 'react-icons/ti'
import useConversation from '../../zustand/useConversation'
import { set } from 'mongoose'


const MessagesContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    // unmount when not in view
    return () => setSelectedConversation(null)
  },[setSelectedConversation]);

  return (
    <div className='flex flex-col w-full mx-5 py-5 relative'>
    {!selectedConversation ? <NoChatSelected /> : <ChatSelected/>}
    </div>
  )
}


const NoChatSelected = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-x1text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p className='text-5xl'>Welcome John Doe! 👋 </p>
        <p className='text-3xl'>Select a chat to start messaging</p>
        <TiMessages className='text-9xl md:text-6x1 text-center' />
      </div>
    </div>
  )
}

const ChatSelected = () => {
  return (
    <>
      <TitleBar/>

      <Messages />

      <MessageInput />
    </>
  )
}

export default MessagesContainer