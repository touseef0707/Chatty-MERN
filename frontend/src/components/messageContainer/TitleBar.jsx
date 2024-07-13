import React from 'react'
import useConversation from '../../zustand/useConversation'

const TitleBar = () => {
    const { selectedConversation } = useConversation()
    return (
        <div className="chatHeader flex items-center space-x-5 backdrop-filter backdrop-blur-3xl rounded-2xl bg-opacity-60 px-5 py-2">
            <div className="relative inline-block w-11">
                <img src={selectedConversation.profilePicture} alt="profile" className="w-full h-full" />
                <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="name flex">
                <h1 className="text-white font-bold text-xl flex justify-start">{selectedConversation.fullName}</h1>
            </div>

            <button className="btn bg-red-600 hover:bg-red-800 rounded-full border-none halfDesktop:hidden absolute right-3 ">
                <img src="svg/arrowback.svg" alt="back" />
            </button>
            <div />
        </div>
    )
}

export default TitleBar
