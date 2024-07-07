import React from 'react';
import { Link } from 'react-router-dom';

const ChattyLanding = () => {
    return (
        <div className="px-5 h-full flex items-center bg-slate-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-slate-500">
            <div className="hero">
            <div className="hero-content flex-col halfDesktop:flex-row">
            <img
                // import image from public folder
                    src="logo_transparent_1.png"
                    className="rounded-lg sm:w-sm"
                    alt="Chat illustration"
                />
                <div className="halfDesktop:ml-8 text-center halfDesktop:text-left">
                    <h1 className="text-5xl font-bold text-gray-300">Welcome to Chatty!</h1>
                    <p className="py-6 text-gray-400">
                        Connect with friends and family instantly. Share your thoughts, send messages,
                        and stay connected no matter where you are. Join the Chatty community today!
                    </p>
                    <Link to={'/signup'} className="btn  text-white bg-red-700 hover:bg-red-900 border-none">
                        Get Started
                    </Link>
                </div>
                
            </div>
        </div>
        </div>
    );
};

export default ChattyLanding;
