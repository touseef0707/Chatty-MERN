import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Custom hook to fetch conversations
const useGetConversations = () => {
    const [loading, setLoading] = useState(true);   // loading states
    const [conversations, setConversations] = useState([]);     // conversation states

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);

            try {
                // Fetch all the users
                const res = await fetch('/api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });

                // Parse the data
                const data = await res.json();

                // if error in data
                if (data.error) {
                    throw new Error(data.error);
                }

                // Set the conversations
                setConversations(data);

            } catch (error) {
                toast.error(error.message);

            } finally {
                setLoading(false);
            }
        };
        
        // Call the getConversations function when the component mounts
        getConversations();
    }, []);

    // Return an object with both loading and conversations
    return { loading, conversations };
};

export default useGetConversations;
