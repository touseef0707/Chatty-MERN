import React, {useState} from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authContext.jsx';

const useLogout = () => {
    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();

    const Logout = async () => {
        try {

            const result = await fetch("http://localhost:8000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await result.json()
            if(data.error){
                toast.error(data.error)
            }

            if (result.ok){
                toast.success("User logged out successfully")
                localStorage.removeItem("chat-user")
                setAuthUser(null)
            } else {
                toast.error(result.error)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    return { Logout, loading };
}

export default useLogout
