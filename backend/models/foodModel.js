import mongoose from "mongoose";
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
})
const foodModel =mongoose.models.Food || mongoose.model("Food",foodSchema);
export default foodModel