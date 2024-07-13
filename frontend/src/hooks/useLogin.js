import React, {useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();

    const login = async (data) => {
        const success = handleInputErrors(data)
        if (!success) return
        try {
            setLoading(true)
            const res = await fetch('http://localhost:8000/api/auth/login', {
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
                localStorage.setItem('chat-user', JSON.stringify(result))
                setAuthUser(result)
            }
            else {
                toast.error(result.error)
                console.log(result.error)
            }
            
            
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { login, loading };
}

function handleInputErrors(data) {
    const { username, password} = data;

    // Example error handling logic
    const errors = {};

    if (!username || username.trim() === '') {
        errors.username = "Username is required";
    }

    if (!password || password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(errors).length > 0) {
        for (const key in errors) {
            toast.error(errors[key]);
        }
        return false;
    }
    return true;
}

export default useLogin




