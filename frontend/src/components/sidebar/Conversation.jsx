import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {

    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    const formatName = (fullName) => {
        const nameParts = fullName.split(' ');
        let formattedName = nameParts.slice(0, 2).join(' ');
        if (fullName.length > 20) {
            formattedName = formattedName.substring(0, 17) + '...';
        }
        return formattedName;
    };

    return(
        <>
            <div 
            className={`conversation flex items-center space-x-4 p-3 backdrop-filter 
                hover:backdrop-blur-lg bg-opacity-30 w-full
                ${isSelected ? "bg-sky-300" : ""}`}
            onClick={() => setSelectedConversation(conversation)}
            >
                <div className="relative w-11">
                    <img src={conversation.profilePicture} alt="profile" className="w-full h-full" />
                    <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div className="name w-full">
                    <h1 className="text-white flex justify-start">{formatName(conversation.fullName)}</h1>
                </div>
            </div>

            {!lastIdx && <div className="divider my-0 py-0 h-1"/>}
        </>
    )
}

export default Conversation