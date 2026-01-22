// import mongoose from "mongoose";

// const subCategorySchema = new mongoose.Schema({
//     name : {
//         type : String,
//         default : ""
//     },
//     image : {
//         type : String,
//         default : ""
//     },
//     category : [
//         {
//             type : mongoose.Schema.ObjectId,
//             ref : "category"
//         }
//     ]
// },{
//     timestamps : true
// })

// const SubCategoryModel = mongoose.model('subCategory',subCategorySchema)

// export default SubCategoryModel


import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const SubCategoryModel = mongoose.model("subCategory", subCategorySchema);
export default SubCategoryModel;

