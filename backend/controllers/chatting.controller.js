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
                { sender: currentUser, receiver: userToChat },
                { sender: userToChat, receiver: currentUser }
            ]
        })
    }
    catch (error) {
        next(error)
    }
})

const sendMessage = asyncHandler(async (req, res, next) => {
    try{
        const receiverId = req.params.id
        const senderId = req.user.id
        const { message} = req.body
        const imagelocalPath = req.file.path
        let sharedImage;
        if(imagelocalPath){
            const imageOnCloud = await uploadDataOnCloud(imagelocalPath)
            if(!imageOnCloud){
                throw new APIError(400, "Failed to upload chat image on cloud ")
            }
            sharedImage = imageOnCloud.url
        }

        const chatting = await Chat.create({
            sender: senderId,
            receiver: receiverId,
            message,
            images: sharedImage
        })
        if(!chatting){
            throw new APIError(500, "Failed to store message on db")
        }
        await chatting.save().
        res.status(200)
        .json(new APIResponse(200, chatting, "Message sent successfully"))
    }
    catch(error){
        next(error)
    }
})

export { getUsers, getMessage, sendMessage }