import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        // Handle SignUp logic here
        console.log('Full Name:', fullName);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Gender:', gender);
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
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder='Full Name'
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            className="w-fit px-4 py-2 mt-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength={3}
                            placeholder='Username'
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            className="w-fit px-4 py-2 mt-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder='Password'
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            id="gender"
                            className="w-full px-4 py-2 mt-2 border-b bg-transparent placeholder-slate-300 text-center text-white focus:outline-none"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
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
                        SignUp
                    </button>
                    <p className='text-sm my-2'><span>Already have an account? </span><span><Link to={'/login'} className="text-red-400">Login</Link></span></p>
                </form>
            </div>
            </div>
    );
};

export default SignUp;
