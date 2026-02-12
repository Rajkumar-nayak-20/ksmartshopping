// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { FaRegUserCircle } from "react-icons/fa"
// import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit'
// import Axios from '../utils/Axios'
// import summaryApi from '../common/SummaryApi'
// import AxiosToastError from '../utils/AxiosToastError'
// import toast from 'react-hot-toast'
// import { setUserDetails } from '../store/userslice'
// import fetchUserDetails from '../utils/fetchUserDetails'
// const Profile = () => {
//   const user = useSelector(state => state.user)

//   const [openProfikeAvatarEdit, setProfileAvatarEdit] = useState(false)

//   const [userData, setUserData] = useState({
//     name: user.name,
//     email: user.email,
//     mobile: user.mobile
//   })

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     mobile: ""
//   })
//   const [loading, setLoading] = useState(false)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     setUserData({
//       name: user.name,
//       email: user.email,
//       mobile: user.mobile
//     })
//   }, [user])

//   /* ================= VALIDATION ================= */

//   const validateField = (name, value) => {
//     let message = ""

//     if (name === "name") {
//       if (value.trim().length < 3) {
//         message = "Name must be at least 3 characters"
//       }
//     }

//     if (name === "email") {
//       const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/
//       if (!emailRegex.test(value)) {
//         message = "Email must start with lowercase and be valid"
//       }
//     }

//     if (name === "mobile") {
//       const mobileRegex = /^[6-9]\d{9}$/
//       if (!mobileRegex.test(value)) {
//         message = "Enter a valid 10-digit mobile number"
//       }
//     }

//     setErrors(prev => ({ ...prev, [name]: message }))
//   }

//   /* ================= HANDLERS ================= */

//   const handleOnChange = (e) => {
//     const { name, value } = e.target

//     setUserData(prev => ({
//       ...prev,
//       [name]: value
//     }))

//     validateField(name, value)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       setLoading(true)
//       const response = await Axios({
//         ...summaryApi.updateUserDetails,
//         data: userData

//       })  
//       const
//        {data : responseData} = response
//       if(responseData.success){
//         toast.success(responseData.message)
//         const userData = await fetchUserDetails()
//         dispatch(setUserDetails(userData.data))
//       }
//     } catch (error) {
//       AxiosToastError(error)
      
//     }finally{
//       setLoading(false)
//     }
//   }

//  return (
  
//     <div className="max-w-xl mx-auto p-4">

//       {/* Avatar */}
//       <div className="flex flex-col items-start">
//         <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-full overflow-hidden shadow-lg">
//           {user.avatar ? (
//             <img
//               src={user.avatar}
//               alt={user.name}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <FaRegUserCircle size={65} className="text-gray-400" />
//           )}
//         </div>

//         <button
//           onClick={() => setProfileAvatarEdit(true)}
//           className="
//             mt-3 text-sm px-4 py-1 rounded-full
//             border border-[#00a040]
//             text-[#00a040]
//             hover:bg-[#00a040] hover:text-white
//             transition
//           "
//         >
//           Edit
//         </button>
//       </div>

//       {/* Avatar Modal */}
//       {openProfikeAvatarEdit && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//           <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
//         </div>
//       )}

//       {/* Profile Form */}
//       <form
//         id="profileForm"
//         className="my-6 grid gap-5"
//         onSubmit={handleSubmit}
//       >

//         {/* Full Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={userData.name}
//             onChange={handleOnChange}
//             placeholder="Enter your full name"
//             className="
//               w-full px-5 py-4 rounded-2xl
//               bg-gray-50/70 backdrop-blur-md
//               text-gray-900 text-sm
//               placeholder-gray-400
//               outline-none
//               border border-transparent
//               shadow-sm
//               focus:bg-white
//               focus:border-[#00a040]
//               focus:ring-2 focus:ring-[#00a040]/30
//               transition-all duration-300
//             "
//           />
//           {errors.name && (
//             <p className="text-xs text-red-500 mt-1">{errors.name}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             type="text"
//             name="email"
//             value={userData.email}
//             onChange={handleOnChange}
//             placeholder="Enter your email"
//             className="
//               w-full px-5 py-4 rounded-2xl
//               bg-gray-50/70 backdrop-blur-md
//               text-gray-900 text-sm
//               placeholder-gray-400
//               outline-none
//               border border-transparent
//               shadow-sm
//               focus:bg-white
//               focus:border-[#00a040]
//               focus:ring-2 focus:ring-[#00a040]/30
//               transition-all duration-300
//             "
//           />
//           {errors.email && (
//             <p className="text-xs text-red-500 mt-1">{errors.email}</p>
//           )}
//         </div>

//         {/* Mobile */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Mobile
//           </label>
//           <input
//             type="text"
//             name="mobile"
//             value={userData.mobile}
//             onChange={handleOnChange}
//             placeholder="Enter your mobile number"
//             className="
//               w-full px-5 py-4 rounded-2xl
//               bg-gray-50/70 backdrop-blur-md
//               text-gray-900 text-sm
//               placeholder-gray-400
//               outline-none
//               border border-transparent
//               shadow-sm
//               focus:bg-white
//               focus:border-[#00a040]
//               focus:ring-2 focus:ring-[#00a040]/30
//               transition-all duration-300
//             "
//           />
//           {errors.mobile && (
//             <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
//           )}
//         </div>

//       </form>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         form="profileForm"
//         className="
//           w-full bg-[#00a040] text-white font-bold py-3 rounded-xl
//           hover:bg-[#008f38]
//           active:scale-[0.97]
//           transition-all
//           focus:ring-2 focus:ring-[#00a040]/50
//         "
//       >
        
//         {
//           loading ?  "Loading..." : "SUBMIT"
//         }
//       </button>
      

//     </div>
//   )
// }

// export default Profile

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa"
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit'
import Axios from '../utils/Axios'
import summaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { setUserDetails } from '../store/userslice'
import fetchUserDetails from '../utils/fetchUserDetails'

const Profile = () => {
  const user = useSelector(state => state.user)
  const [openProfikeAvatarEdit, setProfileAvatarEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: ""
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    })
  }, [user])

  /* ================= VALIDATION ================= */
  const validateField = (name, value) => {
    let message = ""

    if (name === "name") {
      if (value.trim().length < 3) {
        message = "Name must be at least 3 characters"
      }
    }

    if (name === "email") {
      const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/
      if (!emailRegex.test(value)) {
        message = "Email must start with lowercase and be valid"
      }
    }

    if (name === "mobile") {
      const mobileRegex = /^[6-9]\d{9}$/
      if (!mobileRegex.test(value)) {
        message = "Enter a valid 10-digit mobile number"
      }
    }

    setErrors(prev => ({ ...prev, [name]: message }))
  }

  /* ================= HANDLERS ================= */
  const handleOnChange = (e) => {
    const { name, value } = e.target

    setUserData(prev => ({
      ...prev,
      [name]: value
    }))

    validateField(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await Axios({
        ...summaryApi.updateUserDetails,
        data: userData
      })  
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Premium Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-500">Manage your personal information and preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaRegUserCircle size={70} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">Edit</span>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 mt-1">{user.email}</p>
            <button
              onClick={() => setProfileAvatarEdit(true)}
              className="
                mt-4 px-5 py-2 rounded-xl
                bg-gradient-to-r from-[#00a040] to-[#00c050]
                text-white font-medium text-sm
                hover:shadow-lg hover:shadow-[#00a040]/20
                active:scale-[0.98]
                transition-all duration-300
                flex items-center gap-2
              "
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Change Photo
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <form id="profileForm" className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 tracking-wide">
                Full Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleOnChange}
                  placeholder="Enter your full name"
                  className="
                    w-full pl-12 pr-5 py-4 rounded-xl
                    bg-gray-50/70 backdrop-blur-md
                    text-gray-900 text-sm
                    placeholder-gray-400
                    outline-none
                    border border-gray-200
                    shadow-sm
                    hover:border-[#00a040]/50
                    focus:bg-white
                    focus:border-[#00a040]
                    focus:shadow-lg focus:shadow-[#00a040]/10
                    transition-all duration-300
                  "
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 tracking-wide">
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleOnChange}
                  placeholder="Enter your email"
                  className="
                    w-full pl-12 pr-5 py-4 rounded-xl
                    bg-gray-50/70 backdrop-blur-md
                    text-gray-900 text-sm
                    placeholder-gray-400
                    outline-none
                    border border-gray-200
                    shadow-sm
                    hover:border-[#00a040]/50
                    focus:bg-white
                    focus:border-[#00a040]
                    focus:shadow-lg focus:shadow-[#00a040]/10
                    transition-all duration-300
                  "
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-800 tracking-wide">
                Mobile Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="mobile"
                  value={userData.mobile}
                  onChange={handleOnChange}
                  placeholder="Enter your mobile number"
                  className="
                    w-full pl-12 pr-5 py-4 rounded-xl
                    bg-gray-50/70 backdrop-blur-md
                    text-gray-900 text-sm
                    placeholder-gray-400
                    outline-none
                    border border-gray-200
                    shadow-sm
                    hover:border-[#00a040]/50
                    focus:bg-white
                    focus:border-[#00a040]
                    focus:shadow-lg focus:shadow-[#00a040]/10
                    transition-all duration-300
                  "
                />
              </div>
              {errors.mobile && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.mobile}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setUserData({
                  name: user.name,
                  email: user.email,
                  mobile: user.mobile
                })
                setErrors({
                  name: "",
                  email: "",
                  mobile: ""
                })
              }}
              className="
                px-8 py-3 rounded-xl
                border-2 border-gray-300
                text-gray-700 font-semibold
                hover:bg-gray-50
                active:scale-[0.98]
                transition-all duration-300
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              form="profileForm"
              disabled={loading}
              className="
                px-10 py-3 rounded-xl
                bg-gradient-to-r from-[#00a040] to-[#00c050]
                text-white font-semibold
                hover:shadow-xl hover:shadow-[#00a040]/30
                active:scale-[0.98]
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
                min-w-[120px]
              "
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Avatar Modal */}
      {openProfikeAvatarEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
        </div>
      )}
    </div>
  )
}

export default Profile