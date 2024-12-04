import mongoose from 'mongoose' 

const connectDB = async() =>{
    try{
        const dbInstance = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
        console.log(`MongoDB connected successfully`)  // If connection is successful, this message will be printed to the console.
    }
    catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;
