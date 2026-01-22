export  const baseURL = "http://localhost:8181"

const summaryApi = {
    register : {
    url:'api/user/register',
    method:'POST'
    },
    login : {
        url:'api/user/login',
        method:'POST'
    },
    forgot_Password : {
        url:'api/user/forgot-password',
        method:'PUT'
    },
    forgot_Password_otp_verification:{
        url:'api/user/verify-forgot-password-otp',
        method:'PUT'

    } ,
    resetPassword :{
        url:'api/user/reset-password',
        method:'PUT'
    },
    refreshToken :{
        url:'api/user/refresh-token',
        method:'POST'
    },
    userDetails :{
        url:'/api/user/user-details',
        method:"GET"
    },
    logout :{
        url:"/api/user/logout",
        method:'get'
    },
    uploadAvatar:{
        url:"/api/user/upload-avatar",
        method:'PUT'
    },
    updateUserDetails:{
        url:'/api/user/update-user',
        method:'PUT'
    },
    addCategory:{
        url:'/api/category/add-category',
        method:'POST'
    },
    uploadImage :{
        url:'/api/file/upload',
        method:'POST'
    },
    getCategory :{
        url:'/api/category/get',
        method:'GET'
    },
    updateCategory :{
        url:'/api/category/update',
        method:'PUT'
    },
    deleteCategory :{
        url:'/api/category/delete',
        method:'DELETE'
    },
   getCategory: {
    url: "/api/category/get",
    method: "get"
  },

    createSubCategory : {
        url : '/api/subcategory/create',
        method : 'post'
    },
    getSubCategory : {
        url : '/api/subcategory/get',
        method : 'post'
    },
    updateSubCategory : {
        url : '/api/subcategory/update',
        method : 'put'
    },
    deleteSubCategory : {
        url : '/api/subcategory/delete',
        method : 'delete'
    },
    
}
export default summaryApi