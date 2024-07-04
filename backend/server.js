import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectDB from '../backend/db/connectToMongoDB.js'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000;

app.use(express.json()) // to parse the incoming request with JSON payloads
app.use(cookieParser()) // to parse the incoming request cookies

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/user', userRoutes)


app.listen(port, () =>{
    connectDB()
    console.log(`Server is running on  http://localhost:${port}`)
})