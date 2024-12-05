import User from '../models/User.models.js'
import { APIError } from '../utils/APIError.utils.js';
import { APIResponse } from '../utils/APIResponse.utils.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import generateAccessAndRefreshToken from '../middlewares/generateToken.middleware.js';

const signup = asyncHandler(async (req,res, next) => {
    try {
        const { fullname, email, password } = req.body
        if (password.length < 6) {
            throw new APIError(400, "Password must be at least 6 characters")
        }
        const existingUser = await User.findOne({email:email})
        if (existingUser) {
            throw new APIError(400, "User with this email already exists")
        }
        const user = await User.create({
            email: email,
            fullname: fullname,
            password: password,
        })
        const createdUser = await User.findById(user.id).select("-password,-refreshToken")
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(createdUser._id)
        console.log(`Access token: ${accessToken} refresh token: ${refreshToken}`)

        const options = {
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross site request forgery attacks
            secure: process.env.NODE_ENV !== 'development'
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new APIResponse(200, { user: createdUser, accessToken: accessToken}, "User created successfully"))
    }
    catch (error) {
        next(error)
    }
})

const login = (req, res) => {
    res.send("Login Controller")
}

const logout = (req, res) => {
    res.send("Logout Controller")
}

export { signup, login, logout }