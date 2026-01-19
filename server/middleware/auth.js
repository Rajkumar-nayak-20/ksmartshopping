// import jwt from 'jsonwebtoken'

// const auth = async(request,response,next)=>{
//     try {
//         const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1]
       
//         if(!token){
//             return response.status(401).json({
//                 message : "Provide token"
//             })
//         }

//         const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

//         if(!decode){
//             return response.status(401).json({
//                 message : "unauthorized access",
//                 error : true,
//                 success : false
//             })
//         }

//         request.userId = decode.id

//         next()

//     } catch (error) {
//         return response.status(500).json({
//             message : "You have not login",///error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// export default auth


import jwt from "jsonwebtoken";

const auth = (request, response, next) => {
  try {
    const token =
      request.cookies?.accessToken ||
      request.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Access token required",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );

    if (!decoded) {
      return response.status(401).json({
        message: "Unauthorized access",
        error: true,
        success: false,
      });
    }

    request.userId = decoded.id;
    next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid or expired token",
      error: true,
      success: false,
    });
  }
};

export default auth;
