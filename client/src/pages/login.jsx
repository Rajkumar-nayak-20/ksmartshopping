// import React, { useState } from 'react'
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
// import toast from 'react-hot-toast';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import { Link, useNavigate } from 'react-router-dom';
// import fetchUserDetails from '../utils/fetchUserDetails';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from '../store/userslice';

// const Login = () => {
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//     })
//     const [showPassword, setShowPassword] = useState(false)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const handleChange = (e) => {
//         const { name, value } = e.target

//         setData((preve) => {
//             return {
//                 ...preve,
//                 [name]: value
//             }
//         })
//     }

//     const valideValue = Object.values(data).every(el => el)


//     const handleSubmit = async(e)=>{
//         e.preventDefault()

//         try {
//             const response = await Axios({
//                 ...SummaryApi.login,
//                 data : data
//             })
            
//             if(response.data.error){
//                 toast.error(response.data.message)
//             }

//             if(response.data.success){
//                 toast.success(response.data.message)
//                 localStorage.setItem('accesstoken',response.data.data.accesstoken)
//                 localStorage.setItem('refreshToken',response.data.data.refreshToken)

//                 const userDetails = await fetchUserDetails()
//                 dispatch(setUserDetails(userDetails.data))

//                 setData({
//                     email : "",
//                     password : "",
//                 })
//                 navigate("/")
//             }

//         } catch (error) {
//             AxiosToastError(error)
//         }



//     }
//     return (
//         // 
//         <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-3">
//   <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-200">

//     {/* Heading */}
//     <div className="text-center mb-6">
//       <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
//       <p className="text-sm text-gray-500 mt-1">
//         Login to continue
//       </p>
//     </div>

//     <form className="grid gap-6" onSubmit={handleSubmit}>

//       {/* Email */}
//       <div className="relative">
//         <label
//           htmlFor="email"
//           className="text-sm font-medium text-gray-600 mb-1 block"
//         >
//           Email Address
//         </label>

//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={data.email}
//           onChange={handleChange}
//           placeholder="Enter your email"
//           className="
//             w-full px-4 py-3
//             bg-white
//             border border-gray-300
//             rounded-xl
//             text-sm
//             shadow-sm
//             outline-none
//             focus:ring-2 focus:ring-green-500/40
//             focus:border-green-500
//             transition-all duration-300
//           "
//         />
//       </div>

//       {/* Password */}
//       <div className="relative">
//         <label
//           htmlFor="password"
//           className="text-sm font-medium text-gray-600 mb-1 block"
//         >
//           Password
//         </label>

//         <div
//           className="
//             flex items-center gap-2
//             px-4 py-3
//             bg-white
//             border border-gray-300
//             rounded-xl
//             shadow-sm
//             focus-within:ring-2 focus-within:ring-green-500/40
//             focus-within:border-green-500
//             transition-all duration-300
//           "
//         >
//           <input
//             type={showPassword ? "text" : "password"}
//             id="password"
//             name="password"
//             value={data.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             className="w-full outline-none text-sm bg-transparent"
//           />

//           <div
//             onClick={() => setShowPassword(preve => !preve)}
//             className="cursor-pointer text-gray-500 hover:text-green-600 transition"
//           >
//             {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//           </div>
//         </div>

//         <Link
//           to="/forgot-password"
//           className="block text-right text-sm text-green-700 hover:text-green-800 mt-2 font-medium"
//         >
//           Forgot password?
//         </Link>
//       </div>

//       {/* Button */}
//       <button
//         disabled={!valideValue}
//         className={`
//           w-full py-3 rounded-xl font-semibold tracking-wide
//           transition-all duration-300
//           ${valideValue
//             ? "bg-gradient-to-r from-green-700 to-green-600 hover:scale-[1.02] hover:shadow-lg"
//             : "bg-gray-400 cursor-not-allowed"}
//           text-white
//         `}
//       >
//         Login
//       </button>
//     </form>

//     {/* Footer */}
//     <p className="text-center text-sm text-gray-600 mt-6">
//       Don&apos;t have an account?
//       <Link
//         to="/register"
//         className="ml-1 font-semibold text-green-700 hover:text-green-800"
//       >
//         Register
//       </Link>
//     </p>

//   </div>
// </section>

//     )
// }

// export default Login



// import React, { useState } from 'react'
// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6"
// import toast from 'react-hot-toast'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import AxiosToastError from '../utils/AxiosToastError'
// import { Link, useNavigate } from 'react-router-dom'
// import fetchUserDetails from '../utils/fetchUserDetails'
// import { useDispatch } from 'react-redux'
// import { setUserDetails } from '../store/userslice'

// /* ================= VALIDATION REGEX ================= */
// const emailRegex =
//   /^[a-z][a-z0-9._%+-]*@[a-z][a-z0-9-]*\.[a-z]{2,}(\.[a-z]{2,})?$/

// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
// /* =================================================== */

// const Login = () => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   /* ================= VALIDATION FLAGS ================= */
//   const isValidEmail = emailRegex.test(data.email)
//   const isValidPassword = passwordRegex.test(data.password)
//   /* =================================================== */

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   /* Existing logic preserved */
//   const valideValue = Object.values(data).every(el => el)

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     /* ======= FRONTEND VALIDATION ======= */
//     if (!isValidEmail) {
//       toast.error("Please enter a valid email address")
//       return
//     }

//     if (!isValidPassword) {
//       toast.error(
//         "Password must be at least 8 characters and include uppercase and lowercase letters"
//       )
//       return
//     }
//     /* ================================== */

//     try {
//       const response = await Axios({
//         ...SummaryApi.login,
//         data: data
//       })

//       if (response.data.error) {
//         toast.error(response.data.message)
//       }

//       if (response.data.success) {
//         toast.success(response.data.message)

//         localStorage.setItem('accesstoken', response.data.data.accesstoken)
//         localStorage.setItem('refreshToken', response.data.data.refreshToken)

//         const userDetails = await fetchUserDetails()
//         dispatch(setUserDetails(userDetails.data))

//         setData({ email: "", password: "" })
//         navigate("/")
//       }
//     } catch (error) {
//       AxiosToastError(error)
//     }
//   }

//   return (
//     <section className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 px-3">
//       <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-200">

//         {/* Heading */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
//           <p className="text-sm text-gray-500 mt-1">Login to continue</p>
//         </div>

//         <form className="grid gap-6" onSubmit={handleSubmit}>

//           {/* Email */}
//           <div>
//             <label className="text-sm font-medium text-gray-600 mb-1 block">
//               Email Address
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500/40"
//             />

//             {data.email && !isValidEmail && (
//               <p className="text-xs text-red-500 mt-1">
//                 Please enter a valid email address
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-medium text-gray-600 mb-1 block">
//               Password
//             </label>

//             <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-green-500/40">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="w-full outline-none text-sm bg-transparent"
//               />

//               <span
//                 onClick={() => setShowPassword(prev => !prev)}
//                 className="cursor-pointer text-gray-500"
//               >
//                 {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//               </span>
//             </div>

//             {data.password && !isValidPassword && (
//               <p className="text-xs text-red-500 mt-1">
//                 Password must contain uppercase, lowercase and be at least 8 characters
//               </p>
//             )}

//             <Link
//               to="/forgot-password"
//               className="block text-right text-sm text-green-700 mt-2 font-medium"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {/* Button */}
//           <button
//             disabled={!valideValue}
//             className={`w-full py-3 rounded-xl font-semibold transition-all
//               ${valideValue
//                 ? "bg-linear-to-r from-green-700 to-green-600 hover:scale-[1.02]"
//                 : "bg-gray-400 cursor-not-allowed"}
//               text-white`}
//           >
//             Login
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don&apos;t have an account?
//           <Link to="/register" className="ml-1 font-semibold text-green-700">
//             Register
//           </Link>
//         </p>

//       </div>
//     </section>
//   )
// }

// export default Login



import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6"
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { Link, useNavigate } from 'react-router-dom'
import fetchUserDetails from '../utils/fetchUserDetails'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../store/userslice'

/* ================= VALIDATION REGEX ================= */
const emailRegex =
  /^[a-z][a-z0-9._%+-]*@[a-z][a-z0-9-]*\.[a-z]{2,}(\.[a-z]{2,})?$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
/* =================================================== */

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  /* ================= VALIDATION FLAGS ================= */
  const isValidEmail = emailRegex.test(data.email)
  const isValidPassword = passwordRegex.test(data.password)
  /* =================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isValidEmail) {
      toast.error("Please enter a valid email address")
      return
    }

    if (!isValidPassword) {
      toast.error(
        "Password must be at least 8 characters and include uppercase and lowercase letters"
      )
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)

        localStorage.setItem('accesstoken', response.data.data.accesstoken)
        localStorage.setItem('refreshToken', response.data.data.refreshToken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setData({ email: "", password: "" })
        navigate("/")
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-white px-4">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT : LOGIN FORM */}
        <div className="p-8">

          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-1">Login to continue</p>
          </div>

          <form className="grid gap-6" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent
                  text-sm placeholder-gray-400
                  focus:bg-white focus:border-green-600
                  focus:ring-2 focus:ring-green-500/40 outline-none"
              />

              {data.email && !isValidEmail && (
                <p className="text-xs text-red-500 mt-1">
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Password
              </label>

              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 border border-transparent
                focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-500/40">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
                />

                <span
                  onClick={() => setShowPassword(prev => !prev)}
                  className="cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>

              {data.password && !isValidPassword && (
                <p className="text-xs text-red-500 mt-1">
                  Password must contain uppercase, lowercase and be at least 8 characters
                </p>
              )}

              <Link
                to="/forgot-password"
                className="block text-right text-sm text-green-700 mt-2 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Button */}
            <button
              disabled={!valideValue}
              className={`w-full py-3 rounded-xl font-semibold transition-all
                ${valideValue
                  ? "bg-gradient-to-r from-green-700 to-green-600 hover:scale-[1.02]"
                  : "bg-gray-400 cursor-not-allowed"}
                text-white`}
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?
            <Link to="/register" className="ml-1 font-semibold text-green-700">
              Register
            </Link>
          </p>
        </div>

        {/* RIGHT PANEL (SAME AS REGISTER) */}
          <div className="hidden md:flex items-center justify-center bg-[#328c44] text-white p-6">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold mb-2">K’s Shopping Mart</h2>
            <p className="text-sm text-green-100">
              Secure • Fast • Premium Shopping Experience
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Login
