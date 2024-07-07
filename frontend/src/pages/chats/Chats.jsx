import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessagesContainer from '../../components/messageContainer/MessageContainer.jsx'

const Chats = () => {
  return (
    <div className="w-full h-full bg-slate-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-slate-500 flex">
        <Sidebar />
        <MessagesContainer />
    </div>
  )
}

export default Chats
