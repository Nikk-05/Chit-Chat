import mongoose from 'mongoose' 

const connectDB = async() =>{
    try{
        const dbInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected successfully on: ${dbInstance.connection.host}`)  // If connection is successful, this message will be printed to the console.
    }
    catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;
