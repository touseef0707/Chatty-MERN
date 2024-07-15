import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const useSignup = () => {

    const [loading, setLoading] = useState(false);      // Loading state
    const { setAuthUser } = useAuthContext();       // get setAuthUser state method from useAuthContext

    
    const signup = async (data) => {

        // Step 1: Handle Input Errors
        const success = handleInputErrors(data);
        if (!success) return;

        // Hitting API with try catch block
        try {
            setLoading(true);

            // Hit API post
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            // Get result
            const result = await res.json();

            // if result is OK
            if (res.ok) {

                toast.success(result.message);
                // console.log(result);

                // Save user data in local storage
                localStorage.setItem('chat-user', JSON.stringify(result));

                // Set user data in context
                setAuthUser(result);

            }
            else {
                toast.error(result.message);
                // console.log(result.error);
            }


        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false);

        }
    }
    return { signup, loading };
}

// Helper function to handle input errors if any
function handleInputErrors(data) {

    // destructure the data
    const { fullName, username, password, confirmPassword, gender } = data;
    const errors = {};

    if (!fullName || fullName.trim() === '') {
        errors.fullName = "Full name is required";
    }

    if (!username || username.trim() === '') {
        errors.username = "Username is required";
    }

    if (!password || password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    if (!gender) {
        errors.gender = "Gender is required";
    }

    if (Object.keys(errors).length > 0) {
        for (const key in errors) {
            toast.error(errors[key]);
        }
        return false;
    }
    return true;
}

export default useSignup;