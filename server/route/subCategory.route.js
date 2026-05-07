
import express from 'express';
import {
    createSubCategoryController,  
    getSubCategoryController,      
    updateSubCategoryController,   
    deleteSubCategoryController    
} from '../controllers/subCategory.controller.js';

const router = express.Router();


router.post('/create', createSubCategoryController);
router.get('/get', getSubCategoryController);
router.put('/update', updateSubCategoryController);
router.delete('/delete', deleteSubCategoryController);

export default router;