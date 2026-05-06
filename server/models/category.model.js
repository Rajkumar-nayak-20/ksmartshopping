import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        default : "",
    },
    image : {
        type : String,
        default : ""
    }
},{
    timestamps : true//timestamps option ko true set karne se mongoose automatically createdAt aur updatedAt fields ko manage karega. Jab bhi ek naya document create hoga, createdAt field me current date and time store hoga. Jab bhi ek existing document update hoga, updatedAt field me current date and time store hoga. Isse hume pata chal sakta hai ki document kab create hua tha aur kab last update hua tha.
})

const CategoryModel = mongoose.model('category',categorySchema)

export default CategoryModel