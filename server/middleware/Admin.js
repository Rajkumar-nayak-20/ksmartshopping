import UserModel from "../models/user.model.js"

export const admin = async(request,response,next)=>{
    //
    try {
       const  userId = request.userId

       const user = await UserModel.findById(userId)//find the user by id from the database using the userId from the request object (which is set by the authentication middleware)

       if(user.role !== 'ADMIN'){
            return response.status(400).json({
                message : "Permission denial",
                error : true,
                success : false
            })
       }

       next()

    } catch (error) {
        return response.status(500).json({
            message : "Permission denial",
            error : true,
            success : false
        })
    }
}