import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from '../backend/db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import {app, io, server} from './socket/socket.js';

dotenv.config();
// const app = express(); -- commented out because we are importing it from socket.js

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Enable set cookie header
};

app.use(cors(corsOptions)); 
app.use(express.json()) // to parse the incoming request with JSON payloads
app.use(cookieParser()) // to parse the incoming request cookies

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

// Required for production
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () =>{
    connectDB()
    console.log(`Server is running on  http://localhost:${port}`)
})