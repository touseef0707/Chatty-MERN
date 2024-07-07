import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="w-full p-8 bg-slate-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-slate-500 flex justify-center ">
            <div className="max-w-lg flex flex-col justify-center space-y-3">
                    <h1 className="text-2xl font-bold text-gray-300 text-center">Login</h1>
                    <form onSubmit={handleLogin}>
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
                        <button
                            type="submit"
                            className="w-full my-2 btn text-white bg-red-700 hover:bg-red-900 border-none"
                        >
                            Login
                        </button>
                        <p className='text-sm my-2'><span>Do not have an account? </span><span><Link to={'/signup'} className="text-red-400">SignUp</Link></span></p>
                    </form>
                </div>
            </div>

    );
};

export default Login;