import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js'
import { verifyJwt } from '../middlewares/verifyToken.middleware.js'

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Home route")
})

router.post("/signup", signup)
router.post("/login", login)

router.get("/logout",verifyJwt,logout)

export default router;