import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullname:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unique : true,
    },
    password:{
        type : String,
        required : true,
        minlength:6
    },
    profilePicture:{
        type : String,
        default:""
    },
    refreshToken:{
        type : String,
        default:null
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    // always put field name as a string
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
})

userSchema.methods.checkPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

// Create a method to generate access tokens and refresh tokens using user data

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
    process.env.ACCESS_TOKEN,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

const User = mongoose.model("User",userSchema);

export default User