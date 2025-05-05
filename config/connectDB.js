import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!'mongodb://localhost:27017/test_db'){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB(){
    try {
        await mongoose.connect('mongodb://localhost:27017/test_db')
        console.log("connect DB")
    } catch (error) {
        console.log("Mongodb connect error",error)
        process.exit(1)
    }
}

export default connectDB