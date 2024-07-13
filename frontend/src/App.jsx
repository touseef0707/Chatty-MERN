import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation/Navigation'; './components/navigation/Navigation';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import Chats from './pages/chats/Chats';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/authContext.jsx';
import { Navigate } from 'react-router-dom';

function App() {
  const { authUser } = useAuthContext();
  return (
    <Router>
      <div className=" w-full h-[521px] flex flex-col justify-start items-center">
        <Navigation />
        <div className=" w-full  h-[553px] flex justify-center pt-9 absolute">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={authUser? <Navigate to='/chats'/> : <Login />} />
            <Route path="/signup" element={authUser? <Navigate to='/chats'/> : <SignUp />} />
            <Route path="/chats" element={!authUser? <Navigate to='/login'/> : <Chats />} />
            <Route path="/profile" element={!authUser? <Navigate to='/login'/> : <Profile />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </Router >
  );
}

export default App;
