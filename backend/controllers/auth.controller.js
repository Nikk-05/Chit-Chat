import User from '../models/User.models.js'
import { APIError } from '../utils/APIError.utils.js';
import { APIResponse } from '../utils/APIResponse.utils.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import generateAccessAndRefreshToken from '../middlewares/generateToken.middleware.js';
import { uploadDataOnCloud } from '../utils/cloudinary.utils.js';

const signup = asyncHandler(async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        if (password.length < 6) {
            throw new APIError(400, "Password must be at least 6 characters")
        }
        const existingUser = await User.findOne({ email: email })
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

        const options = {
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross site request forgery attacks
            secure: process.env.NODE_ENV !== 'development'
        }

        return res.status(200)
            .cookie("refreshToken", refreshToken, options)
            .json(new APIResponse(200, { user: createdUser, accessToken: accessToken }, "User created successfully"))
    }
    catch (error) {
        next(error)
    }
})

const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new APIError(400, "User not found")
        }
        const isAuthenticated = await user.checkPassword(password)
        if (!isAuthenticated) {
            throw new APIError(400, "Wrong password")
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user, password)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== 'development'
        }
        console.log()
        res.status(200)
            .cookie("refreshToken", refreshToken, options)
            .json(new APIResponse(200, { User: loggedInUser, accessToken: accessToken }, "User Logged in successfully"))
    }
    catch (error) {
        next(error)
    }
})

const logout = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndUpdate(userId, { refreshToken: null })
        res.clearCookie("refreshToken", { path: "/" })
        return res.status(200).json(new APIResponse(200, {}, "User Logged out successfully"))
    }
    catch (error) {
        next(error)
    }
})

const updateProfile = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id
        const filePath = req.file?.path // `req.file.path` gives relative path 
        if (!filePath) {
            throw new APIError(400, "No profile picture provided")
        }
        const profilePicture = await uploadDataOnCloud(filePath)

        if (!profilePicture) {
            throw new APIError(500, "Failed to upload profile picture on cloud")
        }
        const uploadedProfilePicture = await User.findByIdAndUpdate(
            { _id: userId },
            {
                $set: {
                    profilePicture: profilePicture.url
                }
            },
            { new: true }).select("-password -refreshToken")

        return res.status(200)
            .json(new APIResponse(200, uploadedProfilePicture, "Profile picture updated successfully"))
    }
    catch (error) {
        next(error)
    }

})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const oldRefreshToken = req.cookies?.refreshToken || req.body.refreshToken
    if (!oldRefreshToken) {
        throw new APIError(401, "No refresh token available")
    }
    try {
        const decodeJwtToken = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN)
        const user = await User.findById(decodeJwtToken?._id)
        if (!user) {
            throw new APIError(401, "User not found")
        }
        if (oldRefreshToken != user.refreshToken) {
            throw new APIError(401, "Refresh token has expired")
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)
        const options = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== 'development'
        }

        return res.status(200)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new APIResponse(200, {accessToken: accessToken }, "User created successfully"))
    }
    catch (error) {
        next(error)
    }
})

const authUser = asyncHandler(async (req, res,next) => {
    try{
        const user = req.user
        return res.status(200).json(new APIResponse(200, user, "User authenticated successfully"))
    }
    catch(error){
        next(error)
    }
})

export { signup, login, logout, updateProfile, refreshAccessToken, authUser}