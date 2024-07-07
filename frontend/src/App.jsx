import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation/Navigation'; './components/navigation/Navigation';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import ChattyLanding from './pages/home/Landing';
import Chats from './pages/chats/Chats';
import Home from './pages/home/Home';


function App() {
  return (
    <Router>
    <div className=" w-full h-[521px] flex flex-col justify-start items-center">
        <Navigation />
        <div className=" w-full  h-[553px] flex justify-center pt-9 absolute">
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </div>
    </div>
            
        </Router >
    );
}

export default App;
