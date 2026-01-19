// import React, { useState } from 'react'
// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"
// import toast from 'react-hot-toast'
// import Axios from '../utils/Axios'
// import summaryApi from '../common/SummaryApi'
// import AxiosToastError from '../utils/AxiosToastError'
// import { useNavigate, Link } from 'react-router-dom'

// const ForgotPassword = () => {
//   const [data, setData] = useState({

//     email: "",


//   })


//   const navigate = useNavigate()

//   const handlechange = (e) => {
//     const { name, value } = e.target
//     setData(prev => ({ ...prev, [name]: value }))
//   }

//   const valideValue = Object.values(data).every(el => el)

//   const handlesubmit = async (e) => {
//     e.preventDefault()


//     try {
//       const response = await Axios({
//         ...summaryApi.forgot_Password,
//         data: data
//       })
//       if (response.data.error) {
//         toast.error(response.data.message)
//       }
//       if (response.data.success) {
//         toast.success(response.data.message)
//         navigate("/verification-otp", {
//           state: data
//         })
//         setData({

//           email: "",


//         })

//       }



//     } catch (error) {
//       AxiosToastError(error)


//     }
//   }


//   return (<section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-3">
//     <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-200">

//       {/* Header */}
//       <div className="mb-6 space-y-1">
//         <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
//           Forgot Password
//         </p>
//         <p className="text-sm text-gray-500">
//           We’ll send an OTP to your registered email address
//         </p>
//       </div>

//       <form className="grid gap-5" onSubmit={handlesubmit}>

//         {/* Email */}
//         <div className="relative">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={data.email}
//             onChange={handlechange}
//             placeholder="Enter your registered email"
//             className="
//             w-full px-4 py-3
//             bg-white
//             border border-gray-300
//             rounded-xl
//             text-sm
//             shadow-sm
//             outline-none
//             focus:ring-2 focus:ring-[#00a040]/40
//             focus:border-[#00a040]
//             transition-all
//           "
//           />
//         </div>

//         {/* Button */}
//         <button
//           disabled={!valideValue}
//           className={`
//           w-full py-3 rounded-xl font-semibold tracking-wide
//           transition-all duration-300
//           ${valideValue
//               ? "bg-gradient-to-r from-[#00a040] to-green-600 hover:shadow-lg hover:scale-[1.02]"
//               : "bg-gray-400 cursor-not-allowed"}
//           text-white
//         `}
//         >
//           Send OTP
//         </button>
//       </form>

//       {/* Footer */}
//       <p className="text-sm text-gray-600 text-center mt-6">
//         Already have an account?
//         <Link
//           to="/login"
//           className="ml-1 text-[#00a040] font-semibold hover:underline"
//         >
//           Login
//         </Link>
//       </p>

//     </div>
//   </section>

//   )
// }

// export default ForgotPassword
// //3:20




// import React, { useState } from 'react'
// import toast from 'react-hot-toast'
// import Axios from '../utils/Axios'
// import summaryApi from '../common/SummaryApi'
// import AxiosToastError from '../utils/AxiosToastError'
// import { useNavigate, Link } from 'react-router-dom'

// /* ================= EMAIL VALIDATION ================= */
// const emailRegex =
//   /^[a-z][a-z0-9._%+-]*@[a-z][a-z0-9-]*\.[a-z]{2,}(\.[a-z]{2,})?$/
// /* =================================================== */

// const ForgotPassword = () => {
//   const [data, setData] = useState({
//     email: "",
//   })

//   const navigate = useNavigate()

//   /* ================= VALIDATION FLAG ================= */
//   const isValidEmail = emailRegex.test(data.email)
//   /* ================================================== */

//   const handlechange = (e) => {
//     const { name, value } = e.target
//     setData(prev => ({ ...prev, [name]: value }))
//   }

//   /* Existing logic preserved */
//   const valideValue = Object.values(data).every(el => el)

//   const handlesubmit = async (e) => {
//     e.preventDefault()

//     /* ===== FRONTEND VALIDATION ONLY ===== */
//     if (!isValidEmail) {
//       toast.error("Please enter a valid email address")
//       return
//     }
//     /* =================================== */

//     try {
//       const response = await Axios({
//         ...summaryApi.forgot_Password,
//         data: data
//       })

//       if (response.data.error) {
//         toast.error(response.data.message)
//       }

//       if (response.data.success) {
//         toast.success(response.data.message)
//         navigate("/verification-otp", { state: data })
//         setData({ email: "" })
//       }

//     } catch (error) {
//       AxiosToastError(error)
//     }
//   }

//   return (
//     <section className="w-full min-h-screen flex items-center justify-center  from-green-50 via-white to-green-100 px-3">
//       <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-200">

//         {/* Header */}
//         <div className="mb-6 space-y-1">
//           <p className="text-2xl font-extrabold text-gray-900">
//             Forgot Password
//           </p>
//           <p className="text-sm text-gray-500">
//             We’ll send an OTP to your registered email address
//           </p>
//         </div>

//         <form className="grid gap-5" onSubmit={handlesubmit}>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Email Address
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={data.email}
//               onChange={handlechange}
//               placeholder="Enter your registered email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#00a040]/40"
//             />

//             {data.email && !isValidEmail && (
//               <p className="text-xs text-red-500 mt-1">
//                 Please enter a valid email address
//               </p>
//             )}
//           </div>

//           {/* Button */}
//           <button
//             disabled={!valideValue}
//             className={`w-full py-3 rounded-xl font-semibold transition-all
//               ${valideValue
//                 ? " from-[#00a040] to-green-600 hover:scale-[1.02]"
//                 : "bg-gray-400 cursor-not-allowed"}
//               text-white`}
//           >
//             Send OTP
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-gray-600 text-center mt-6">
//           Already have an account?
//           <Link to="/login" className="ml-1 text-[#00a040] font-semibold hover:underline">
//             Login
//           </Link>
//         </p>

//       </div>
//     </section>
//   )
// }

// export default ForgotPassword




import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import summaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { useNavigate, Link } from 'react-router-dom'

/* ================= EMAIL VALIDATION ================= */
const emailRegex =
  /^[a-z][a-z0-9._%+-]*@[a-z][a-z0-9-]*\.[a-z]{2,}(\.[a-z]{2,})?$/
/* =================================================== */

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  })

  const navigate = useNavigate()

  /* ================= VALIDATION FLAG ================= */
  const isValidEmail = emailRegex.test(data.email)
  /* ================================================== */

  const handlechange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const valideValue = Object.values(data).every(el => el)

  const handlesubmit = async (e) => {
    e.preventDefault()

    if (!isValidEmail) {
      toast.error("Please enter a valid email address")
      return
    }

    try {
      const response = await Axios({
        ...summaryApi.forgot_Password,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/verification-otp", { state: data })
        setData({ email: "" })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-white px-4">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT : FORGOT PASSWORD FORM */}
        <div className="p-8 flex flex-col justify-center">

          {/* Header */}
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-500">
              We’ll send an OTP to your registered email address
            </p>
          </div>

          <form className="grid gap-5" onSubmit={handlesubmit}>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handlechange}
                placeholder="Enter your registered email"
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-gray-50 border border-transparent
                  text-sm placeholder-gray-400
                  outline-none
                  focus:bg-white
                  focus:border-[#00a040]
                  focus:ring-2 focus:ring-[#00a040]/40
                "
              />

              {data.email && !isValidEmail && (
                <p className="text-xs text-red-500 mt-1">
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Button */}
            <button
              disabled={!valideValue}
              className={`w-full py-3 rounded-xl font-semibold transition-all text-white
                ${valideValue
                  ? "bg-gradient-to-r from-[#00a040] to-green-600 hover:scale-[1.02]"
                  : "bg-gray-400 cursor-not-allowed"}
              `}
            >
              Send OTP
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?
            <Link to="/login" className="ml-1 text-[#00a040] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT PANEL (SAME AS LOGIN / REGISTER) */}
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

export default ForgotPassword
