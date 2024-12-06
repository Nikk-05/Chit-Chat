import jwt from 'jsonwebtoken'
import User from '../models/User.models.js'
import { asyncHandler } from '../utils/asyncHandler.utils.js'

const verifyJwt = asyncHandler(async(req, res, next) =>{
    try{
        const token = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            throw new Error("Not an authorized user")
        }
        const decodeJwtToken = jwt.verify(token, process.env.REFRESH_TOKEN)
        console.log(decodeJwtToken)
        const authorizedUser = await User.findById(decodeJwtToken?._id).select("-password -refreshToken")
        req.user = authorizedUser
        next();
    }
    catch(error){
        next(error)
    }
})

export {verifyJwt}
