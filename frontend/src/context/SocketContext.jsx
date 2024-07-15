import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext(); // Create Socket Context

export const useSocketContext = () => {
    // Create a custom hook to use Socket Context
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    // Create a Socket Context Provider

    const [socket, setSocket] = useState(null); // Initialize socket state
    const [onlineUsers, setOnlineUsers] = useState([]); // Initialize onlineUsers state

    const { authUser } = useAuthContext(); // Get authUser from AuthContext

    useEffect(() => {
        if (authUser) {
            // If authUser exists, create a socket connection
            const socket = io("https://chatty-mern.onrender.com", {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket); // Set the socket state

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users); // Set the onlineUsers state
            });

            return () => socket.close(); // Close the socket connection when the component unmounts
        } else {
            // If authUser does not exist, close the socket connection
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); // Run this effect whenever authUser changes

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
