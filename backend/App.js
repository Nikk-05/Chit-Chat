import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: '*',
    credentials : true
}))

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

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/chat",chatRoutes)

export {app}