import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useSignup = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (data) => {
        const success = handleInputErrors(data)
        if (!success) return
        try {
            setLoading(true)
            const res = await fetch('http://localhost:8000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            const result = await res.json()
            if (res.ok) {
                toast.success(result.message)
                // console.log(result)
                // Save user data in local storage
                localStorage.setItem('chat-user', JSON.stringify(result))
                // Set user data in context
                setAuthUser(result)

            }
            else {
                toast.error(result.message)
                // console.log(result.error)
            }
            
            
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { signup, loading };
}


function handleInputErrors(data) {
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


export default useSignup
