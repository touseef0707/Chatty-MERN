import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

// Hook to listen for incoming messages
const useListenMessages = () => {
	
	const { socket } = useSocketContext();		// Get socket
	
	// Get messages from useConversation hook	
	const { messages, setMessages } = useConversation();		

	useEffect(() => {

		// If socket exists listen to events for new message
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;		// boolean to set class later to a message component
			const sound = new Audio(notificationSound);		// play notification sound
			sound.play();
			setMessages([...messages, newMessage]);		// Update messages state
		});

		return () => socket?.off("newMessage");		// clean the listener for new messages	
	
	}, [socket, setMessages, messages]);	
};
export default useListenMessages;