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
      const
       {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }
    } catch (error) {
      AxiosToastError(error)
      
    }finally{
      setLoading(false)
    }
  }

 return (
  
    <div className="max-w-xl mx-auto p-4">

      {/* Avatar */}
      <div className="flex flex-col items-start">
        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-full overflow-hidden shadow-lg">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle size={65} className="text-gray-400" />
          )}
        </div>

        <button
          onClick={() => setProfileAvatarEdit(true)}
          className="
            mt-3 text-sm px-4 py-1 rounded-full
            border border-[#00a040]
            text-[#00a040]
            hover:bg-[#00a040] hover:text-white
            transition
          "
        >
          Edit
        </button>
      </div>

      {/* Avatar Modal */}
      {openProfikeAvatarEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
        </div>
      )}

      {/* Profile Form */}
      <form
        id="profileForm"
        className="my-6 grid gap-5"
        onSubmit={handleSubmit}
      >

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleOnChange}
            placeholder="Enter your full name"
            className="
              w-full px-5 py-4 rounded-2xl
              bg-gray-50/70 backdrop-blur-md
              text-gray-900 text-sm
              placeholder-gray-400
              outline-none
              border border-transparent
              shadow-sm
              focus:bg-white
              focus:border-[#00a040]
              focus:ring-2 focus:ring-[#00a040]/30
              transition-all duration-300
            "
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleOnChange}
            placeholder="Enter your email"
            className="
              w-full px-5 py-4 rounded-2xl
              bg-gray-50/70 backdrop-blur-md
              text-gray-900 text-sm
              placeholder-gray-400
              outline-none
              border border-transparent
              shadow-sm
              focus:bg-white
              focus:border-[#00a040]
              focus:ring-2 focus:ring-[#00a040]/30
              transition-all duration-300
            "
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            value={userData.mobile}
            onChange={handleOnChange}
            placeholder="Enter your mobile number"
            className="
              w-full px-5 py-4 rounded-2xl
              bg-gray-50/70 backdrop-blur-md
              text-gray-900 text-sm
              placeholder-gray-400
              outline-none
              border border-transparent
              shadow-sm
              focus:bg-white
              focus:border-[#00a040]
              focus:ring-2 focus:ring-[#00a040]/30
              transition-all duration-300
            "
          />
          {errors.mobile && (
            <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
          )}
        </div>

      </form>

      {/* Submit Button */}
      <button
        type="submit"
        form="profileForm"
        className="
          w-full bg-[#00a040] text-white font-bold py-3 rounded-xl
          hover:bg-[#008f38]
          active:scale-[0.97]
          transition-all
          focus:ring-2 focus:ring-[#00a040]/50
        "
      >
        
        {
          loading ?  "Loading..." : "SUBMIT"
        }
      </button>
      

    </div>
  )
}

export default Profile

