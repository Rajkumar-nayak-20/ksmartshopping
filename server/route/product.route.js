import { Router } from 'express'
import auth from '../middleware/auth.js'
import { addProductReview, createProductController, deleteProductDetails, deleteProductReview, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails, updateProductReview } from '../controllers/product.controller.js'
import { admin } from '../middleware/Admin.js'

const productRouter = Router()

productRouter.post("/create",auth,admin,createProductController)
productRouter.post('/get',getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post('/get-pruduct-by-category-and-subcategory',getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details',getProductDetails)

//update product
productRouter.put('/update-product-details',auth,admin,updateProductDetails)

//delete product
productRouter.delete('/delete-product',auth,admin,deleteProductDetails)

//search product 
productRouter.post('/search-product',searchProduct)
productRouter.post("/add-review", auth,addProductReview)

// update review
productRouter.put("/update-review", auth, updateProductReview)

// delete review
productRouter.delete("/delete-review", auth, deleteProductReview)


export default productRouter