import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only from the specified origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    // allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers explicitly (optional)
}));

app.use(express.json({
    limit: '1000kb'
}))

app.use(express.urlencoded({
    extended : true,
    limit: '1000kb'
}))

app.use(cookieParser())

import authRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import { errorHandler } from './middlewares/errorHandler.middleware.js'

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/chat",chatRoutes)

app.use(errorHandler)

export {app}