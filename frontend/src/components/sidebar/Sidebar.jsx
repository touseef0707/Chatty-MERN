import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import LogoutDiv from './LogoutDiv.jsx'

const Sidebar = () => {
  return (
    <div className="hidden halfDesktop:block">
      <div className='sidebar flex flex-col relative mx-5 py-5'>
        <SearchInput/>
        <div className="divider"></div>
        <Conversations/>
        <LogoutDiv/>
      </div>
    </div>
  )
}

export default Sidebar
