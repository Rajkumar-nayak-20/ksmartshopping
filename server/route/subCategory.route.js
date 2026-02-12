// import { Router } from "express";
// import auth from "../middleware/auth.js";
// import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";

// const subCategoryRouter = Router()

// subCategoryRouter.post('/create',auth,AddSubCategoryController)
// subCategoryRouter.post('/get',getSubCategoryController)
// subCategoryRouter.put('/update',auth,updateSubCategoryController)
// subCategoryRouter.delete('/delete',auth,deleteSubCategoryController)

// export default subCategoryRouter


import express from 'express';
import {
    createSubCategoryController,  // ✅ નવું નામ
    getSubCategoryController,      // ✅ નવું નામ
    updateSubCategoryController,   // ✅ નવું નામ
    deleteSubCategoryController    // ✅ નવું નામ
} from '../controllers/subCategory.controller.js';

const router = express.Router();

// ✅ નવા નામો અનુસાર routes
router.post('/create', createSubCategoryController);
router.get('/get', getSubCategoryController);
router.put('/update', updateSubCategoryController);
router.delete('/delete', deleteSubCategoryController);

export default router;