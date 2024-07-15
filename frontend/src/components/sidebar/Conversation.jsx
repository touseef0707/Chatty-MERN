import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { formatName, ellipsisName } from "../../utils/formatName";

// Conversation: A sub-component of conversations to display a single conversation
const Conversation = ({ conversation, lastIdx }) => {

    // Get selectedConversation and setSelectedConversation from useConversation hook
    const { selectedConversation, setSelectedConversation } = useConversation();

    // Get onlineUsers from useSocketContext hook
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    // Check if the conversation is selected
    const isSelected = selectedConversation?._id === conversation._id;

    // Parse the name of the conversation
    const parseName = (fullName) => {
        return formatName(ellipsisName(fullName));
    };

    return (
        <>
            <div
                className={`conversation flex items-center space-x-4 p-3 backdrop-filter 
                hover:backdrop-blur-lg bg-opacity-30 w-full
                ${isSelected ? "bg-sky-300" : ""}`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className="relative w-11 ">
                    <img src={conversation.profilePicture} alt="profile" className="w-full h-full" />
                    {isOnline && <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>}
                </div>
                <div className="name w-full">
                    <h1 className="text-white flex justify-start">{parseName(conversation.fullName)}</h1>
                </div>
            </div>

            {!lastIdx && <div className="divider my-0 py-0 h-1" />}
        </>
    );
}

export default Conversation;