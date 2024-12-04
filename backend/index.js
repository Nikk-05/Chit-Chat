import express from 'express';
import dotenv from 'dotenv'
import connectDB from './dbConnection.js';

dotenv.config();
// connectDB();
const app = express();
const PORT =  process.env.PORT || 3000;

app.listen(PORT,()=>{
    
    console.log(`Server is running on port ${PORT}`)
})

// app.get('/chat-chat/api/v1/user',userRoutes)