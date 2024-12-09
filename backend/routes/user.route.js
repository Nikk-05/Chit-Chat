import express from 'express'
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js'
import { verifyJwt } from '../middlewares/verifyToken.middleware.js'
import {uploader} from '../middlewares/multer.middlerware.js'

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Home route")
})

router.post("/signup", signup)
router.post("/login", login)

// secure routes
router.route("/logout").get(verifyJwt,logout)
router.route("/update-profile").post(verifyJwt,uploader.single("profilePic"),updateProfile)

export default router;