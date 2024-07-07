import React from 'react'

const Messages = () => {
    return (
        <div className="messages overflow-y-auto">
            <div className="chat chat-start pr-16">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://avatar.iran.liara.run/public/boy?username=john" />
                    </div>
                </div>
                <div className="chat-bubble text-sm text-start">It</div>
                <div className="chat-footer">
                    <div className="time text-xs">12:32</div>
                </div>
            </div>

            <div className="chat chat-end pl-16">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://avatar.iran.liara.run/public/boy?username=touseef" />
                    </div>
                </div>
                <div className="chat-bubble text-sm text-start">Alright n</div>
                <div className="chat-footer">
                    <div className="time text-xs">12:32</div>
                </div>
            </div>

            <div className="chat chat-start pr-16">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://avatar.iran.liara.run/public/boy?username=john" />
                    </div>
                </div>
                <div className="chat-bubble text-sm text-start">It was said that you would, destroy the Sith, not join them.</div>
                <div className="chat-footer">
                    <div className="time text-xs">12:32</div>
                </div>
            </div>

            <div className="chat chat-end pl-16">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://avatar.iran.liara.run/public/boy?username=touseef" />
                    </div>
                </div>
                <div className="chat-bubble text-sm text-start">Alright now that i am a member of them, it will be easier to destroy them.</div>
                <div className="chat-footer">
                    <div className="time text-xs">12:32</div>
                </div>
            </div>
        </div>
    )
}

export default Messages
