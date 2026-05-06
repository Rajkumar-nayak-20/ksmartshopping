import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}//if there is no MONGODB_URI in the .env file, throw an error

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB")
    } catch (error) {
        console.log("Mongodb connect error",error)
        process.exit(1)
    }
}//connectDB function to connect to the MongoDB database using the MONGODB_URI from the .env file. If there is an error, it will log the error and exit the process.

export default connectDB