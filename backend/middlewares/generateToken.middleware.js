import { APIError } from "../utils/APIError.utils.js"
import User from '../models/User.models.js'
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const userWithId = await User.findById(userId)
        const accessToken = await userWithId.generateAccessToken()
        const refreshToken = await userWithId.generateRefreshToken()
        userWithId.refreshToken = refreshToken
        // Now save the object
        // When we save using this method this will check for all validation, as we are sending only one data we need to turn off the validatioon
        await userWithId.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    }
    catch (error) {
        throw new APIError(500, "Error generating tokens: " + error.message)
    }
}
export default generateAccessAndRefreshToken;