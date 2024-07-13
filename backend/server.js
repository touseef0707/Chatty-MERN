import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from '../backend/db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Enable set cookie header
};

app.use(cors(corsOptions)); 
app.use(express.json()) // to parse the incoming request with JSON payloads
app.use(cookieParser()) // to parse the incoming request cookies
// app.use(cors()) // to allow cross-origin requests

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)


app.listen(port, () =>{
    connectDB()
    console.log(`Server is running on  http://localhost:${port}`)
})