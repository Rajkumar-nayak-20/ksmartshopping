// // import React, { useEffect, useState } from 'react'
// // import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
// // import { Link, useLocation, useNavigate } from 'react-router-dom'
// // import SummaryApi from '../common/SummaryApi'
// // import toast from 'react-hot-toast'
// // import AxiosToastError from '../utils/AxiosToastError'
// // import Axios from '../utils/Axios'

// // const ResetPassword = () => {
// //   const location = useLocation()
// //   const navigate = useNavigate()
// //   const [data,setData] = useState({
// //     email : "",
// //     newPassword : "",
// //     confirmPassword : ""
// //   })
// //   const [showPassword,setShowPassword] = useState(false)
// //   const [showConfirmPassword,setShowConfirmPassword] = useState(false)

// //   const valideValue = Object.values(data).every(el => el)

// //   useEffect(()=>{
// //     if(!(location?.state?.data?.success)){
        
// //     }

// //     if(location?.state?.email){
// //         setData((preve)=>{
// //             return{
// //                 ...preve,
// //                 email : location?.state?.email
// //             }
// //         })
// //     }
// //   },[])

// //   const handleChange = (e) => {
// //         const { name, value } = e.target

// //         setData((preve) => {
// //             return {
// //                 ...preve,
// //                 [name]: value
// //             }
// //         })
// //     }

// //   console.log("data reset password",data)

// //   const handleSubmit = async(e)=>{
// //     e.preventDefault()

// //     ///optional 
// //     if(data.newPassword !== data.confirmPassword){
// //         toast.error("New password and confirm password must be same.")
// //         return
// //     }

// //     try {
// //         const response = await Axios({
// //             ...SummaryApi.resetPassword, //change
// //             data : data
// //         })
        
// //         if(response.data.error){
// //             toast.error(response.data.message)
// //         }

// //         if(response.data.success){
// //             toast.success(response.data.message)
// //             navigate("/login")
// //             setData({
// //                 email : "",
// //                 newPassword : "",
// //                 confirmPassword : ""
// //             })
            
// //         }

// //     } catch (error) {
// //         AxiosToastError(error)
// //     }



// // }

// //   return (
// //     <section className='w-full container mx-auto px-2'>
// //             <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
// //                 <p className='font-semibold text-lg'>Enter Your Password </p>
// //                 <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
// //                     <div className='grid gap-1'>
// //                         <label htmlFor='newPassword'>New Password :</label>
// //                         <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
// //                             <input
// //                                 type={showPassword ? "text" : "password"}
// //                                 id='password'
// //                                 className='w-full outline-none'
// //                                 name='newPassword'
// //                                 value={data.newPassword}
// //                                 onChange={handleChange}
// //                                 placeholder='Enter your new password'
// //                             />
// //                             <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
// //                                 {
// //                                     showPassword ? (
// //                                         <FaRegEye />
// //                                     ) : (
// //                                         <FaRegEyeSlash />
// //                                     )
// //                                 }
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className='grid gap-1'>
// //                         <label htmlFor='confirmPassword'>Confirm Password :</label>
// //                         <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
// //                             <input
// //                                 type={showConfirmPassword ? "text" : "password"}
// //                                 id='password'
// //                                 className='w-full outline-none'
// //                                 name='confirmPassword'
// //                                 value={data.confirmPassword}
// //                                 onChange={handleChange}
// //                                 placeholder='Enter your confirm password'
// //                             />
// //                             <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
// //                                 {
// //                                     showConfirmPassword ? (
// //                                         <FaRegEye />
// //                                     ) : (
// //                                         <FaRegEyeSlash />
// //                                     )
// //                                 }
// //                             </div>
// //                         </div>
// //                     </div>
             
// //                     <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Change Password</button>

// //                 </form>

// //                 <p>
// //                     Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
// //                 </p>
// //             </div>
// //         </section>
// //   )
// // }

// // export default ResetPassword


// // import React, { useEffect, useState, useMemo } from 'react'
// // import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
// // import { Link, useLocation, useNavigate } from 'react-router-dom'
// // import SummaryApi from '../common/SummaryApi'
// // import toast from 'react-hot-toast'
// // import AxiosToastError from '../utils/AxiosToastError'
// // import Axios from '../utils/Axios'

// // const ResetPassword = () => {
// //   const location = useLocation()
// //   const navigate = useNavigate()

// //   const [data, setData] = useState({
// //     email: "",
// //     newPassword: "",
// //     confirmPassword: ""
// //   })

// //   const [showPassword, setShowPassword] = useState(false)
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

// //   /* ================= VALIDATION ================= */

// //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/

// //   const isValidPassword = passwordRegex.test(data.newPassword)
// //   const isPasswordMatch = data.newPassword === data.confirmPassword

// //   const valideValue = useMemo(() => {
// //     return (
// //       data.email &&
// //       isValidPassword &&
// //       isPasswordMatch
// //     )
// //   }, [data.email, isValidPassword, isPasswordMatch])

// //   /* ================= EFFECT ================= */

// //   useEffect(() => {
// //     if (location?.state?.email) {
// //       setData(preve => ({
// //         ...preve,
// //         email: location.state.email
// //       }))
// //     }
// //   }, [])

// //   /* ================= HANDLERS ================= */

// //   const handleChange = (e) => {
// //     const { name, value } = e.target
// //     setData(preve => ({ ...preve, [name]: value }))
// //   }

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault()

// // //     if (!isValidPassword) {
// // //       toast.error(
// // //         "Password must be at least 8 characters and include uppercase & lowercase letters"
// // //       )
// // //       return
// // //     }

// // //     if (!isPasswordMatch) {
// // //       toast.error("New password and confirm password must be the same")
// // //       return
// // //     }

// // //     try {
// // //       const response = await Axios({
// // //         ...SummaryApi.resetPassword,
// // //         data: data
// // //       })

// // //       if (response.data.error) {
// // //         toast.error(response.data.message)
// // //       }

// // //       if (response.data.success) {
// // //         toast.success(response.data.message)
// // //         navigate("/login")
// // //         setData({
// // //           email: "",
// // //           newPassword: "",
// // //           confirmPassword: ""
// // //         })
// // //       }

// // //     } catch (error) {
// // //       AxiosToastError(error)
// // //     }
// // //   }
// // const handleSubmit = async (e) => {
// //   e.preventDefault()

// //   if (!isValidPassword) {
// //     toast.error(
// //       "Password must be at least 8 characters and include uppercase and lowercase letters"
// //     )
// //     return
// //   }

// //   if (!isPasswordMatch) {
// //     toast.error("Passwords do not match")
// //     return
// //   }

// //   // API call only if everything is valid
// // }

// //   return (
// //     <section className='w-full container mx-auto px-2'>
// //       <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
// //         <p className='font-semibold text-lg'>Enter Your Password</p>

// //         <form className='grid gap-4 py-4' onSubmit={handleSubmit}>

// //           {/* New Password */}
// //           <div className='grid gap-1'>
// //             <label>New Password :</label>
// //             <div className='bg-blue-50 p-2 border rounded flex items-center'>
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 className='w-full outline-none'
// //                 name='newPassword'
// //                 value={data.newPassword}
// //                 onChange={handleChange}
// //                 placeholder='Enter your new password'
// //               />
// //               <div
// //                 onClick={() => setShowPassword(p => !p)}
// //                 className='cursor-pointer'
// //               >
// //                 {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
// //               </div>
// //             </div>

// //             {data.newPassword && !isValidPassword && (
// //               <p className='text-xs text-red-500'>
// //                 Password must be 8+ characters with uppercase & lowercase letters
// //               </p>
// //             )}
// //           </div>

// //           {/* Confirm Password */}
// //           <div className='grid gap-1'>
// //             <label>Confirm Password :</label>
// //             <div className='bg-blue-50 p-2 border rounded flex items-center'>
// //               <input
// //                 type={showConfirmPassword ? "text" : "password"}
// //                 className='w-full outline-none'
// //                 name='confirmPassword'
// //                 value={data.confirmPassword}
// //                 onChange={handleChange}
// //                 placeholder='Enter confirm password'
// //               />
// //               <div
// //                 onClick={() => setShowConfirmPassword(p => !p)}
// //                 className='cursor-pointer'
// //               >
// //                 {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
// //               </div>
// //             </div>

// //             {data.confirmPassword && !isPasswordMatch && (
// //               <p className='text-xs text-red-500'>
// //                 Passwords do not match
// //               </p>
// //             )}
// //           </div>

// //           {/* Button */}
// //           <button
// //             disabled={!valideValue}
// //             className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}
// //               text-white py-2 rounded font-semibold my-3 tracking-wide`}
// //           >
// //             Change Password
// //           </button>

// //         </form>

// //         <p>
// //           Already have account?
// //           <Link to="/login" className='font-semibold text-green-700 hover:text-green-800 ml-1'>
// //             Login
// //           </Link>
// //         </p>
// //       </div>
// //     </section>
// //   )
// // }

// // export default ResetPassword



// import React, { useEffect, useState, useMemo } from 'react'
// import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import SummaryApi from '../common/SummaryApi'
// import toast from 'react-hot-toast'
// import AxiosToastError from '../utils/AxiosToastError'
// import Axios from '../utils/Axios'

// const ResetPassword = () => {
//   const location = useLocation()
//   const navigate = useNavigate()

//   const [data, setData] = useState({
//     email: "",
//     newPassword: "",
//     confirmPassword: ""
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   /* ================= VALIDATION ================= */

//   // At least 8 chars, one uppercase, one lowercase
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/

//   const isValidPassword = passwordRegex.test(data.newPassword)
//   const isPasswordMatch = data.newPassword === data.confirmPassword

//   // ✅ EMAIL IS NOT PART OF BUTTON VALIDATION
//   const valideValue = useMemo(() => {
//     return (
//       data.newPassword &&
//       data.confirmPassword &&
//       isValidPassword &&
//       isPasswordMatch
//     )
//   }, [data.newPassword, data.confirmPassword, isValidPassword, isPasswordMatch])

//   /* ================= EFFECT ================= */

//   useEffect(() => {
//     if (location?.state?.email) {
//       setData(prev => ({
//         ...prev,
//         email: location.state.email
//       }))
//     }
//   }, [])

//   /* ================= HANDLERS ================= */

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // ❗ One mistake → one message only
//     if (!isValidPassword) {
//       toast.error(
//         "Password must be at least 8 characters and include uppercase and lowercase letters"
//       )
//       return
//     }

//     if (!isPasswordMatch) {
//       toast.error("Passwords do not match")
//       return
//     }

//     try {
//       const response = await Axios({
//         ...SummaryApi.resetPassword,
//         data: data
//       })

//       if (response.data.error) {
//         toast.error(response.data.message)
//       }

//       if (response.data.success) {
//         toast.success(response.data.message)
//         navigate("/login")
//         setData({
//           email: "",
//           newPassword: "",
//           confirmPassword: ""
//         })
//       }

//     } catch (error) {
//       AxiosToastError(error)
//     }
//   }

//   return (
//   <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-3">
//   <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-200">

//     {/* Header */}
//     <div className="mb-6">
//       <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
//         Reset Your Password
//       </p>
//       <p className="text-sm text-gray-500 mt-1">
//         Create a strong and secure password
//       </p>
//     </div>

//     <form className="grid gap-5" onSubmit={handleSubmit}>

//       {/* New Password */}
//       <div className="grid gap-1">
//         <label className="text-sm font-medium text-gray-700">
//           New Password
//         </label>

//         <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-500/40 transition">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="newPassword"
//             value={data.newPassword}
//             onChange={handleChange}
//             placeholder="Enter your new password"
//             className="w-full bg-transparent outline-none text-sm"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(p => !p)}
//             className="text-gray-500 hover:text-green-700 transition"
//           >
//             {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//           </button>
//         </div>

//         {data.newPassword && !isValidPassword && (
//           <p className="text-xs text-red-500">
//             Password must be 8+ characters with uppercase & lowercase letters
//           </p>
//         )}
//       </div>

//       {/* Confirm Password */}
//       <div className="grid gap-1">
//         <label className="text-sm font-medium text-gray-700">
//           Confirm Password
//         </label>

//         <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-500/40 transition">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={data.confirmPassword}
//             onChange={handleChange}
//             placeholder="Re-enter your password"
//             className="w-full bg-transparent outline-none text-sm"
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(p => !p)}
//             className="text-gray-500 hover:text-green-700 transition"
//           >
//             {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//           </button>
//         </div>

//         {data.confirmPassword && !isPasswordMatch && (
//           <p className="text-xs text-red-500">
//             Passwords do not match
//           </p>
//         )}
//       </div>

//       {/* Button */}
//       <button
//         disabled={!valideValue}
//         className={`
//           w-full py-3 rounded-xl font-semibold tracking-wide transition-all duration-300
//           ${valideValue
//             ? "bg-gradient-to-r from-green-700 to-green-600 hover:shadow-lg hover:scale-[1.02]"
//             : "bg-gray-400 cursor-not-allowed"}
//           text-white
//         `}
//       >
//         Change Password
//       </button>

//     </form>

//     {/* Footer */}
//     <p className="text-sm text-gray-600 text-center mt-6">
//       Already have an account?
//       <Link
//         to="/login"
//         className="ml-1 text-green-700 font-semibold hover:underline"
//       >
//         Login
//       </Link>
//     </p>

//   </div>
// </section>

//   )
// }

// export default ResetPassword



import React, { useEffect, useState, useMemo } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  /* ================= VALIDATION ================= */

  // At least 8 chars, one uppercase, one lowercase
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  const isValidPassword = passwordRegex.test(data.newPassword)
  const isPasswordMatch = data.newPassword === data.confirmPassword

  const valideValue = useMemo(() => {
    return (
      data.newPassword &&
      data.confirmPassword &&
      isValidPassword &&
      isPasswordMatch
    )
  }, [data.newPassword, data.confirmPassword, isValidPassword, isPasswordMatch])

  /* ================= EFFECT ================= */

  useEffect(() => {
    if (location?.state?.email) {
      setData(prev => ({
        ...prev,
        email: location.state.email
      }))
    }
  }, [])

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isValidPassword) {
      toast.error(
        "Password must be at least 8 characters and include uppercase and lowercase letters"
      )
      return
    }

    if (!isPasswordMatch) {
      toast.error("Passwords do not match")
      return
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/login")
        setData({
          email: "",
          newPassword: "",
          confirmPassword: ""
        })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-white px-4">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT : RESET PASSWORD FORM */}
        <div className="p-8 flex flex-col justify-center">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Create a strong and secure password
            </p>
          </div>

          <form className="grid gap-5" onSubmit={handleSubmit}>

            {/* New Password */}
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>

              <div className="flex items-center bg-gray-50 border border-transparent rounded-xl px-3 py-2
                focus-within:bg-white focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-500/40 transition">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="text-gray-500 hover:text-green-700 transition"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              {data.newPassword && !isValidPassword && (
                <p className="text-xs text-red-500">
                  Password must be 8+ characters with uppercase & lowercase letters
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <div className="flex items-center bg-gray-50 border border-transparent rounded-xl px-3 py-2
                focus-within:bg-white focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-500/40 transition">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(p => !p)}
                  className="text-gray-500 hover:text-green-700 transition"
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              {data.confirmPassword && !isPasswordMatch && (
                <p className="text-xs text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Button */}
            <button
              disabled={!valideValue}
              className={`w-full py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 text-white
                ${valideValue
                  ? "bg-gradient-to-r from-green-700 to-green-600 hover:shadow-lg hover:scale-[1.02]"
                  : "bg-gray-400 cursor-not-allowed"}
              `}
            >
              Change Password
            </button>

          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-green-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT PANEL (SAME AS OTHER AUTH PAGES) */}
        <div className="hidden md:flex h-full flex-col items-center justify-center bg-[#328c44] text-white p-10">
          <h2 className="text-4xl font-extrabold leading-tight text-center">
            K’s Shopping <br /> Mart
          </h2>
          <p className="mt-4 text-lg opacity-90 text-center">
            Smart shopping starts here
          </p>
        </div>

      </div>
    </section>
  )
}

export default ResetPassword
