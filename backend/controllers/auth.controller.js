import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import genererateTokenAndSetCookie from "../utils/gentoken.js";


export const signup = async (req, res) => {
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword) {
            return res.status(400).json({error: 'Password does not match'})
        }

        const user = await User.findOne({username})
        if(user) {
            return res.status(400).json({error: 'User already exists'})
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyPfp = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlPfp = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName, 
            username,
            password: hashedPassword, 
            gender, 
            profilePicture: gender === 'male' ? boyPfp : girlPfp
        })

        if (newUser){

            genererateTokenAndSetCookie(newUser._id, res)

            await newUser.save()
            console.log('User registered successfully')
            res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullName,
            username: newUser.username,
            profilePicture: newUser.profilePicture,
            message: 'User registered successfully'})
        } else {
            res.status(400).json({error: 'Invalid User Data'})
        }

    } catch (error) {
        console.log("Error in signup controller: ", error.message)
        res.status(500).json({error: 'Something went wrong'})
    }
}


export const login = async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: 'Invalid credentials'})
        }

        genererateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture,
            message: 'User logged in successfully'
        })

    }catch (error) {
        console.log("Error in Login controller: ", error.message)
        res.status(500).json({error: 'Something went wrong'})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt','', {maxAge: 0});
        res.status(200).json({message: 'User signed out successfully'})
    } catch (error) {
        console.log("Error in Logout controller: ", error.message)
        res.status(500).json({error: 'Something went wrong'})
    }
}

