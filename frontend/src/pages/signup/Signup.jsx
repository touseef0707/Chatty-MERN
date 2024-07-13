import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSignup from '../../hooks/useSignup.js';
import { useAuthContext } from '../../context/AuthContext.jsx';

const SignUp = () => {

    const { signup, loading } = useSignup();

    const { authUser } = useAuthContext();

    const navigate = useNavigate();

    const [inputs, setInputs] = useState(
        {
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: ""
        }
    )

    const handleSignUp = async (e) => {
        e.preventDefault();
        await signup(inputs);
        if(authUser){
            navigate('/chats');
        }
    };

    return (
        <div className="w-full p-8 bg-slate-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-slate-500 flex justify-center ">
            <div className="max-w-lg flex flex-col justify-center space-y-3">
                <h1 className="text-2xl font-bold text-center text-gray-300">Create Account</h1>
                <form onSubmit={handleSignUp} className='w-full'>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="fullName"
                            className="w-fit px-4 py-2 mt-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({...inputs, fullName:e.target.value})}
                            required
                            placeholder='Full Name'
                            name='fullName'
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            className="w-fit px-4 py-2 mt-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
                            value={inputs.username}
                            onChange={(e) => setInputs({...inputs, username:e.target.value})}
                            required
                            minLength={3}
                            placeholder='Username'
                            name='username'
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            className="w-fit px-4 py-2 mt-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
                            value={inputs.password}
                            onChange={(e) => setInputs({...inputs, password:e.target.value})}
                            required
                            minLength={6}
                            placeholder='Password'
                            name='password'
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-fit px-4 py-2 mt-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                            required
                            minLength={6}
                            placeholder='Confirm Password'
                            name='password'
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            id="gender"
                            className="w-full px-4 py-2 mt-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
                            value={inputs.gender}
                            onChange={(e) => setInputs({...inputs, gender:e.target.value})}
                            required
                            name='gender'
                        >
                            <option className='bg-black' value="" disabled>Select Gender</option>
                            <option className='bg-black' value="male">Male</option>
                            <option className='bg-black' value="female">Female</option>
                        </select>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full my-2 btn text-white bg-red-700 hover:bg-red-900 border-none"
                    >
                        {loading? <span className='loading loading-spinner'></span>:'SignUp'}
                    </button>
                    <p className='text-sm my-2'><span>Already have an account? </span><span><Link to={'/login'} className="text-red-400">Login</Link></span></p>
                </form>
            </div>
            </div>
    );
};

export default SignUp;
