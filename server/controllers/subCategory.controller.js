import SubCategoryModel from "../models/subCategory.model.js";

// POST: /api/subcategory/create
export const createSubCategoryController = async(request,response)=>{
    try {
        const { name, image, category } = request.body 
        
        console.log("Create SubCategory Request Body:", request.body);
        console.log("Category received:", category);
        console.log("Category type:", typeof category);

        // Handle category as string or array
        let categoryArray = [];
        if (Array.isArray(category)) {
            categoryArray = category;
        } else if (category) {
            categoryArray = [category]; // Convert string to array
        }

        console.log("Final category array:", categoryArray);

        if(!name || !image || categoryArray.length === 0){
            return response.status(400).json({
                message : "Provide name, image, category",
                error : true,
                success : false
            })
        }

        const payload = {
            name,
            image,
            category: categoryArray
        }

        console.log("Payload to save:", payload);

        const createSubCategory = new SubCategoryModel(payload)
        const save = await createSubCategory.save()

        return response.json({
            message : "Sub Category Created",
            data : save,
            error : false,
            success : true
        })

    } catch (error) {
        console.error("Create SubCategory Error:", error);
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// POST: /api/subcategory/get
export const getSubCategoryController = async(request,response)=>{
    try {
        const data = await SubCategoryModel.find()
            .sort({createdAt : -1})
            .populate('category', 'name _id')
            .lean();
        
        console.log("Fetched SubCategories Count:", data?.length);
        
        // Transform data for frontend
        const transformedData = data.map(item => ({
            _id: item._id,
            name: item.name,
            image: item.image,
            categoryId: item.category?.[0]?._id || null,
            category: item.category?.[0] || null
        }));

        console.log("Transformed Data Sample:", transformedData[0]);

        return response.json({
            message : "Sub Category data",
            data : transformedData,
            error : false,
            success : true
        })
    } catch (error) {
        console.error("Get SubCategory Error:", error);
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// PUT: /api/subcategory/update
export const updateSubCategoryController = async(request,response)=>{
    try {
        const { _id, name, image, category } = request.body 

        console.log("Update Request Body:", request.body);

        const checkSub = await SubCategoryModel.findById(_id)

        if(!checkSub){
            return response.status(400).json({
                message : "SubCategory not found",
                error : true,
                success : false
            })
        }

        // Handle category as string or array
        let categoryArray = [];
        if (Array.isArray(category)) {
            categoryArray = category;
        } else if (category) {
            categoryArray = [category];
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(
            _id,
            {
                name,
                image,
                category: categoryArray
            },
            { new: true }
        ).populate('category', 'name _id');

        return response.json({
            message : 'Updated Successfully',
            data : updateSubCategory,
            error : false,
            success : true
        })

    } catch (error) {
        console.error("Update SubCategory Error:", error);
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false 
        })
    }
}

// DELETE: /api/subcategory/delete
export const deleteSubCategoryController = async(request,response)=>{
    try {
        const { _id } = request.body 
        console.log("Delete ID:", _id)
        
        if (!_id) {
            return response.status(400).json({
                message : "_id is required",
                error : true,
                success : false
            })
        }
        
        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)

        if(!deleteSub){
            return response.status(404).json({
                message : "SubCategory not found",
                error : true,
                success : false
            })
        }

        return response.json({
            message : "Deleted successfully",
            data : deleteSub,
            error : false,
            success : true
        })
    } catch (error) {
        console.error("Delete SubCategory Error:", error);
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}