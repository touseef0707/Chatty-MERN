import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.jsx';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { authUser } = useAuthContext();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="w-full p-3 absolute z-10 top-0 bg-slate-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-slate-500">
            <div className="flex justify-between items-center gap-5">
                <div className="flex items-center gap-2">
                    <img
                        src="logo_transparent_1.png"
                        className="rounded-lg w-5"
                        alt="Chat illustration"
                    />
                    <h1 className="text-2xl font-bold text-gray-300">Chatty</h1>
                </div>
                <div className="hidden desktop:flex gap-7">
                    <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-1">
                        <img src="svg/home.svg" alt="home" /> <span>Home</span>
                    </Link>
                    {authUser?<Link to="/chats" className="text-gray-300 hover:text-white flex items-center gap-1">
                        <img src="svg/chat.svg" alt="chat" /> <span>Chats</span>
                    </Link>:null}
                    {!authUser?<Link to="/signup" className="text-gray-300 hover:text-white flex items-center gap-1">
                        <img src="svg/register.svg" alt="register" /><span>SignUp</span>
                    </Link>:null}
                    {!authUser?<Link to="/login" className="text-gray-300 hover:text-white flex items-center gap-1">
                        <img src="svg/login.svg" alt="login" /><span>Login</span>
                    </Link>:null}
                    {authUser?<Link to="/profile" className="text-gray-300 hover:text-white flex items-center gap-1">
                        <img src="svg/account.svg" alt="account" /><span>Account</span>
                    </Link>:null}
                    
                </div>
                <button
                    onClick={toggleMenu}
                    className="desktop:hidden text-gray-300 hover:text-white focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="desktop:hidden flex flex-col mt-4 space-y-2">
                    <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/chats" className="text-gray-300 hover:text-white">Chats</Link>
                    <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
                    <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                    <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
                    <button to="/Logout" className="text-gray-300 hover:text-white text-center">Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navigation;


{/* <nav className="w-full p-3 absolute z-10 top-0 bg-slate-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-slate-500">
            <div className="flex justify-between items-center gap-5">
                <div className="flex items-center gap-2">
                    <img
                        src="logo_transparent_1.png"
                        className="rounded-lg w-5"
                        alt="Chat illustration"
                    />
                    <h1 className="text-2xl font-bold text-gray-300">Chatty</h1>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
                    <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
                    <Link to="/chats" className="text-gray-300 hover:text-white">Chats</Link>
                    <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
                    <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                    <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
                </div>
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden flex flex-col mt-4 space-y-2">
                    <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
                    <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
                    <Link to="/chats" className="text-gray-300 hover:text-white">Chats</Link>
                    <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
                    <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                    <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
                </div>
            )}
        </nav> */}