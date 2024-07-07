import React from 'react'

const BottomBar = () => {
    return (
        <div className="absolute bottom-3 w-full">
            <form action="#" aria-label="Search" role="search" className="flex items-center w-full pl-3 bg-slate-800 rounded-full bottomBar bottom-3" id="search-container">
                <div className="w-full flex items-center space-x-3">
                    <input type="text" placeholder="Type to chat..." className="w-full flex bg-transparent border-none outline-none text-white placeholder-gray-400" />
                    <button className="btn border-none bg-red-600 hover:bg-red-800 rounded-full">
                        <img src="svg/send.svg" alt="send" />
                    </button>
                </div>
            </form>
        </div>

    )
}

export default BottomBar
