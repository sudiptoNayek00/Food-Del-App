
import mongoose from "mongoose";

export const connectDB = async ()=>{
    const MONGO_URL= process.env.MONGO_URI
    
    if (!MONGO_URL) {
        console.error("MONGO_URI environment variable is not defined");
        process.exit(1); // Exit the process with failure
    }
    
        await mongoose.connect(MONGO_URL)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.error("Database connection failed:", err.message);
            process.exit(1); // Exit the process with failure   
        })
    
    
}