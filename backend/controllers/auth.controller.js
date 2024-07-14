import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import genererateTokenAndSetCookie from "../utils/gentoken.js";

// AUTH Controller: SIGNUP
export const signup = async (req, res) => {

    try {

        const { fullName, username, password, confirmPassword, gender } = req.body;

        // VALIDATE USER INPUT (Passwords match)
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Password does not match' });
        }

        // CHECK IF USER ALREADY EXISTS
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // RANDOM PROFILE PICTURE
        const boyPfp = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPfp = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // CREATE NEW USER
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: gender === 'male' ? boyPfp : girlPfp
        });

        if (newUser) {       
            genererateTokenAndSetCookie(newUser._id, res);      // Generate token and set cookie
            await newUser.save();      // Save the newUser to the database

            res.status(201).json({    // Send the response
                _id: newUser._id,
                fullname: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture,
                message: 'User registered successfully'
            });
        }
        else {
            res.status(400).json({ error: 'Invalid User Data' });
        }

    } catch (error) {
        // console.log("Error in signup controller: ", error.message)
        res.status(500).json({ error: 'Server: Signup API Error' });
    }
}

// AUTH Controller: LOGIN
export const login = async (req, res) => {

    try {

        const { username, password } = req.body;    // Get username and password from request body

        const user = await User.findOne({ username });      // Find the user by username

        // Check if user exists and password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid credentials' }) ;
        }

        // Generate token and set cookie
        genererateTokenAndSetCookie(user._id, res);

        // Send the response
        res.status(200).json({
            _id: user._id,
            fullname: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture,
            message: 'User logged in successfully'
        });

    } catch (error) {
        
        // console.log("Error in Login controller: ", error.message);
        res.status(500).json({ error: 'Server: Login API Error' });
    }
}

// AUTH Controller: LOGOUT
export const logout = (req, res) => {

    try {

        res.cookie('jwt', '', { maxAge: 0 }); // Clear the cookie
        res.status(200).json({ message: 'User signed out successfully' });

    } catch (error) {
        
        // console.log("Error in Logout controller: ", error.message);
        res.status(500).json({ error: 'Server: Logout API Error' });
    }
}

