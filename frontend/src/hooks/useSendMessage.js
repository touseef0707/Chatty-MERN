import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

// Define useSendMessage hook
const useSendMessage = () => {

    // Define loading state and setLoading function using useState
    const [loading, setLoading] = useState(false);

    // Destructure messages, setMessages, and selectedConversation from useConversation hook
    const { messages, setMessages, selectedConversation } = useConversation();

    // Define sendMessage function
    const sendMessage = async (message) => {

        setLoading(true);

        try {
            // Send POST request to the server to send the message
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ message })
            });

            // Parse the response data
            const data = await res.json();

            // If there is an error in the response data, throw an error
            if (data.error) throw new Error(data.error)

            // Add the new message to the messages array
            setMessages([...messages, data]);

        } catch (error) {
            // Display an error toast if there is an error
            toast.error(error.message);

        } finally {
            setLoading(false);

        }
    }
    // Return loading state and sendMessage function
    return { loading, sendMessage };
}

// Export useSendMessage hook
export default useSendMessage;