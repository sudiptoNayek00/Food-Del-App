import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    userId:{type: String, required: true},
    items:{
        type: Array,
        required: true,
        default: [],
    },
    amount:{type: Number, required: true},
    address:{type: Object, required: true},
    status:{type: String, required: true, default: "pending"},
    date:{type: Date, default: Date.now()},
    payment:{type:Boolean, default: false},
},{timestamps: true});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default orderModel;
