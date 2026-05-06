import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : 'product'
    },
    quantity : {
        type : Number,
        default : 1
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
})

const CartProductModel = mongoose.model('cartProduct',cartProductSchema)//cartProductSchema ko cartProductModel me convert kar rahe hai using mongoose.model function. Iska matlab hai ki hum cartProduct collection me documents ko store karenge jo ki cartProductSchema ke structure ko follow karte hai. Ye model hume database me cart products ko create, read, update, delete karne ke liye methods provide karega.

export default CartProductModel