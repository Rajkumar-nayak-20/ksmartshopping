


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

  const validateField = (name, value) => {
    let message = ""

    if (name === "name" && value.trim().length < 3) {
      message = "Name must be at least 3 characters"
    }

    if (name === "email") {
      const emailRegex = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/
      if (!emailRegex.test(value)) {
        message = "Enter valid email"
      }
    }

    if (name === "mobile") {
      const mobileRegex = /^[6-9]\d{9}$/
      if (!mobileRegex.test(value)) {
        message = "Enter valid mobile"
      }
    }

    setErrors(prev => ({ ...prev, [name]: message }))
  }

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

      if (response.data.success) {
        toast.success(response.data.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData))
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-5 md:px-6 py-6">

      {/* HEADER */}
      <div className="mb-6 sm:mb-10 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Profile Settings
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Manage your personal information
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8">

        {/* AVATAR */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-10 pb-6 border-b">

          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
              {user.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover" />
              ) : (
                <FaRegUserCircle size={60} className="text-gray-400" />
              )}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>

            <button
              onClick={() => setProfileAvatarEdit(true)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
            >
              Change Photo
            </button>
          </div>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleOnChange}
              className="w-full p-3 border rounded-lg mt-1 text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleOnChange}
              className="w-full p-3 border rounded-lg mt-1 text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          {/* MOBILE */}
          <div>
            <label className="text-sm font-semibold">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={userData.mobile}
              onChange={handleOnChange}
              className="w-full p-3 border rounded-lg mt-1 text-sm"
            />
            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </form>

      </div>

      {/* MODAL */}
      {openProfikeAvatarEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
        </div>
      )}

    </div>
  )
}

export default Profile