import { APIError } from "../utils/APIError.utils.js";
import { APIResponse } from "../utils/APIResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import User from "../models/User.models.js";
import Chat from "../models/Chat.models.js";
import { uploadDataOnCloud } from "../utils/cloudinary.utils.js";
import { response } from "express";

const getUsers = asyncHandler(async (req, res, next) => {
    try {
        const currentUserId = req.user._id
        if (!currentUserId) {
            throw new APIError(401, "Unauthorized user")
        }
        const users = await User.find({
            _id: { $ne: currentUserId }
        }).select("-password -refreshToken")
        return res.status(200)
            .json(new APIResponse(200, users, "Displaying all users"))
    }
    catch (error) {
        next(error)
    }
})

const getMessage = asyncHandler(async (req, res, next) => {
    try {
        const userToChat = req.params.id
        const currentUser = req.user.id
        const messages = await Chat.find({
            $or: [
                { senderId: currentUser, receiverId: userToChat },
                { senderId: userToChat, receiverId: currentUser }
            ]
        })
        res.status(200)
            .json(new APIResponse(200, messages, "Fectched message successfully"))
    }
    catch (error) {
        next(error)
    }
})

const sendMessage = asyncHandler(async (req, res, next) => {
    try {
        const receiver = req.params.id
        const sender = req.user.id
        const { message } = req.body
        let sharedImage = [];
        if (req.files && req.files.length > 0) {
            const imageUploadPromises = req.files.map(async (file) => {
                const result = await uploadDataOnCloud(file.path);
                if (!result) {
                    throw new APIError(400, "Failed to upload chat image on cloud");
                }
                return result.url; // Ensure you're returning the Cloudinary URL
            });

            // Wait for all uploads to complete
            sharedImage = await Promise.all(imageUploadPromises);
        }

        const chatting = await Chat.create({
            senderId: sender,
            receiverId: receiver,
            message,
            images: sharedImage
        })
        if (!chatting) {
            throw new APIError(500, "Failed to store message on db")
        }
        const receiverPerson = await User.findById(receiver).select("-password -refreshToken")
        // Todo: Adding the functionality to the Socket.io protocol
        res.status(200)
            .json(new APIResponse(200, chatting, `Message sent to ${receiverPerson.fullname}`))
    }
    catch (error) {
        next(error)
    }
})

export { getUsers, getMessage, sendMessage }