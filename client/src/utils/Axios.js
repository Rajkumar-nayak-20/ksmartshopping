// // import axios from "axios";
// // import SummaryApi , { baseURL } from "../common/SummaryApi";

// // const Axios = axios.create({
// //     baseURL : baseURL,
// //     withCredentials : true
// // })

// // //sending access token in the header
// // Axios.interceptors.request.use(
// //     async(config)=>{
// //         const accessToken = localStorage.getItem('accesstoken')

// //         if(accessToken){
// //             config.headers.Authorization = `Bearer ${accessToken}`
// //         }

// //         return config
// //     },
// //     (error)=>{
// //         return Promise.reject(error)
// //     }
// // )

// // //extend the life span of access token with 
// // // the help refresh
// // Axios.interceptors.request.use(
// //     (response)=>{
// //         return response
// //     },
// //     async(error)=>{
// //         let originRequest = error.config 

// //         if(error.response.status === 401 && !originRequest.retry){
// //             originRequest.retry = true

// //             const refreshToken = localStorage.getItem("refreshToken")

// //             if(refreshToken){
// //                 const newAccessToken = await refreshAccessToken(refreshToken)

// //                 if(newAccessToken){
// //                     originRequest.headers.Authorization = `Bearer ${newAccessToken}`
// //                     return Axios(originRequest)
// //                 }
// //             }
// //         }
        
// //         return Promise.reject(error)
// //     }
// // )


// // const refreshAccessToken = async(refreshToken)=>{
// //     try {
// //         const response = await Axios({
// //             ...SummaryApi.refreshToken,
// //             headers : {
// //                 Authorization : `Bearer ${refreshToken}`
// //             }
// //         })

// //         const accessToken = response.data.data.accessToken
// //         localStorage.setItem('accesstoken',accessToken)
// //         return accessToken
// //     } catch (error) {
// //         console.log(error)
// //     }
// // }

// // export default Axios//6:00






// // import axios from "axios";
// // import SummaryApi, { baseURL } from "../common/SummaryApi";

// // const Axios = axios.create({
// //   baseURL: baseURL,
// //   withCredentials: true
// // });

// // //  REQUEST INTERCEPTOR (attach access token)
// // Axios.interceptors.request.use(
// //   (config) => {
// //     const accessToken = localStorage.getItem("accesstoken");

// //     if (accessToken) {
// //       config.headers.Authorization = `Bearer ${accessToken}`;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // //  RESPONSE INTERCEPTOR (refresh token logic)
// // Axios.interceptors.response.use(
// //   (response) => {
// //     return response;
// //   },
// //   async (error) => {
// //     const originRequest = error.config;

// //     if (error.response?.status === 401 && !originRequest._retry) {
// //       originRequest._retry = true;

// //       const refreshToken = localStorage.getItem("refreshToken");

// //       if (refreshToken) {
// //         try {
// //           const newAccessToken = await refreshAccessToken(refreshToken);

// //           if (newAccessToken) {
// //             originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
// //             return Axios(originRequest);
// //           }
// //         } catch (err) {
// //           console.log("Refresh token failed:", err);
// //         }
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // // ✅ REFRESH TOKEN FUNCTION
// // const refreshAccessToken = async (refreshToken) => {
// //   try {
// //     const response = await Axios({
// //       ...SummaryApi.refreshToken,
// //       headers: {
// //         Authorization: `Bearer ${refreshToken}`
// //       }
// //     });

// //     // const accessToken = response.data.data.accessToken;
// //     const accessToken = response.data.data.accesstoken

// //     localStorage.setItem("accesstoken", accessToken);

// //     return accessToken;

// //   } catch (error) {
// //     console.log("Refresh error:", error);
// //     return null;
// //   }
// // };

// // export default Axios;






// import axios from "axios";
// import SummaryApi, { baseURL } from "../common/SummaryApi";

// const Axios = axios.create({
//   baseURL: baseURL,
//   withCredentials: true
// });

// // ✅ Attach access token
// Axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accesstoken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   }
// );

// // ✅ Separate instance (IMPORTANT)
// const refreshAxios = axios.create({
//   baseURL: baseURL,
//   withCredentials: true
// });

// // ✅ Refresh function
// const refreshAccessToken = async () => {
//   try {
//     const response = await refreshAxios({
//       ...SummaryApi.refreshToken
//     });

//       if (newToken) {
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return Axios(originalRequest);
//       }
//     }

//     return Promise.reject(error);
//   }
// );



// export default Axios;



import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

// ✅ Main Axios
const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true   // 🔥 must for cookies
});

// ✅ Separate instance (no interceptor loop)
const refreshAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

// Refresh token function (cookie-based)
const refreshAccessToken = async () => {
  try {
    await refreshAxios({
      ...SummaryApi.refreshToken
    });

    return true; // success
  } catch (error) {
    return false;
  }
};

// Response interceptor (auto refresh)
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const success = await refreshAccessToken();

      if (success) {
        return Axios(originalRequest); // retry request
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;