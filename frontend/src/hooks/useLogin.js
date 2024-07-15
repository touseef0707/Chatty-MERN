// Importing necessary dependencies from React and other libraries
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

// Custom hook for handling login functionality
const useLogin = () => {

    // State to manage loading status
    const [loading, setLoading] = useState(false);

    // Using context to set authenticated user details
    const { setAuthUser } = useAuthContext();

    // Function to handle login logic
    const login = async (data) => {

        // Validate input before proceeding with login
        const success = handleInputErrors(data);
        if (!success) return;

        try {
            setLoading(true);

            // Making a POST request to login endpoint
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })

            // Parsing the JSON response
            const result = await res.json();

            if (res.ok) {
                // Display success message and update local storage and context with user data
                toast.success(result.message);
                localStorage.setItem('chat-user', JSON.stringify(result));
                setAuthUser(result);
            }

            else {
                // Display error message in case of failure
                toast.error(result.error);
                console.log(result.error);
            }

        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false);

        }
    }
    return { login, loading };
}

// Function to validate user input
function handleInputErrors(data) {
    const { username, password } = data;

    // Initializing an object to collect errors
    const errors = {};

    // Validating username
    if (!username || username.trim() === '') {
        errors.username = "Username is required";
    }

    // Validating password
    if (!password || password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    // Display errors if any and return false to stop login process
    if (Object.keys(errors).length > 0) {
        for (const key in errors) {
            toast.error(errors[key]);
        }
        return false;
    }
    // Return true if no errors found
    return true;
}

// Exporting the custom hook for use in other components
export default useLogin;