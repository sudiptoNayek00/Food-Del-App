import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import {connectDB} from './config/DBconnection.js';
import {foodRouter} from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRoute from './routes/cartRoute.js';
import authMiddelware from './middleware/auth.js';
import orderRouter from './routes/orderRoute.js';
import logger from './middleware/Logger.js';


//app config
const app= express();
const PORT = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);

//food routes
app.use("/api/food", foodRouter);

app.use('/images',express.static('uploads'));
app.use('/api/user',userRouter);
app.use("/api/cart", authMiddelware,cartRoute);
app.use('/api/orders/',orderRouter);


app.get( '/', (req,res)=>{
    res.status(200).json({
        message: "Welcome to the backend server!"
    });

})

const connectServer = async ()=>{
    await connectDB();
    try{
        app.listen(PORT, () =>{
            console.log(`Server is running on port http://localhost:${PORT}`);
        })
    }catch(err){
        console.error("Error starting the server:", err.message);
        process.exit(1); // Exit the process with failure
    }
}
connectServer();
