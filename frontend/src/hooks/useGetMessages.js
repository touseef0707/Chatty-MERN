import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

// Custom hook for fetching messages
const useGetMessages = () => {
    const [loading, setLoading] = useState(false);      // loading state

    // useConversation hook
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);

            try {
                // Fetch messages from the server
                const res = await fetch(`/api/messages/${selectedConversation._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });

                // Parse data
                const data = await res.json();

                // If data has error
                if (data.error) {
                    throw new Error(data.error);
                }

                // Update the messages state with the fetched data
                setMessages(data);
            } catch (error) {
                // Display an error toast if there's an error
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Call the getMessages function when the selectedConversation._id changes
        if (selectedConversation?._id) {
            getMessages();
        }

    }, [selectedConversation?._id, setMessages]);

    return { loading, messages };
};

export default useGetMessages;