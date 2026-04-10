
import React, { useState, useEffect } from 'react'
import { FaRegEyeSlash, FaRegEye, FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa"
import { RiShieldCheckLine, RiShoppingBag3Line } from "react-icons/ri"
import { GiCheckMark } from "react-icons/gi"
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import summaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { useNavigate, Link } from 'react-router-dom'
import {getAuth,signInWithPopup,GoogleAuthProvider} from "firebase/auth"
import {firebaseapp} from "../firebase"

const  auth = getAuth(firebaseapp)
const provider = new GoogleAuthProvider()


/* ================= REGEX ================= */
 const emailRegex =
    /^[a-z][a-z0-9._%+-]*@[a-z][a-z0-9-]*\.[a-z]{2,}(\.[a-z]{2,})?$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  const mobileRegex = /^[6-9]\d{9}$/
/* ======================================== */

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const navigate = useNavigate()

  /* ================= LIVE VALIDATION ================= */
  useEffect(() => {
    let newErrors = {}
    
    if (data.name && data.name.trim().length < 3)
      newErrors.name = "Minimum 3 characters required"
    
    if (data.email && !emailRegex.test(data.email))
      newErrors.email = "Enter valid email"
    
    if (data.mobile && !mobileRegex.test(data.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile"
    
    if (data.password) {
      if (!passwordRegex.test(data.password))
        newErrors.password = "8+ chars with uppercase & lowercase"
      
      // Calculate password strength
      let strength = 0
      if (data.password.length >= 8) strength += 25
      if (/[a-z]/.test(data.password)) strength += 25
      if (/[A-Z]/.test(data.password)) strength += 25
      if (/[0-9]/.test(data.password)) strength += 25
      setPasswordStrength(strength)
    }
    
    if (data.confirmPassword && data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"
    
    setErrors(newErrors)
  }, [data])
  /* ================================================ */

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix errors before submitting")
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await Axios({
        ...summaryApi.register,
        data
      })
      
      if (response.data?.error) {
        toast.error(response.data.message)
      }
      
      if (response.data?.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: ""
        })
        navigate("/login")
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Password requirements checklist
  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", met: data.password.length >= 8 },
    { id: 2, text: "Contains lowercase letter", met: /[a-z]/.test(data.password) },
    { id: 3, text: "Contains uppercase letter", met: /[A-Z]/.test(data.password) },
    { id: 4, text: "Contains number", met: /[0-9]/.test(data.password) }
  ]



   

//     const response = await Axios({
//       ...summaryApi.authwithGoogle,
//       data
//     })

//     if (response.data.success) {
//       localStorage.setItem("
const authwithgoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    console.log("FIREBASE USER:", user)

    const providerData = user.providerData?.[0]

    const fields = {
      name: providerData?.displayName || user.displayName,
      email: providerData?.email || user.email,
      password: null,
      avatar: providerData?.photoURL || user.photoURL,
      mobile: providerData?.phoneNumber || user.phoneNumber || "",
      role: "USER"
    }

    console.log("SENDING DATA:", fields)

    const response = await Axios({
      ...summaryApi.authwithGoogle,
      data: fields
    })

    console.log("RESPONSE:", response.data)

    if (response.data.success) {
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data.user)
      )

      localStorage.setItem(
        "accesstoken",
        response.data.data.accesstoken
      )

      toast.success("Login success")
      navigate("/")
    }

  } catch (error) {
    console.log("ERROR:", error)
    console.log("BACKEND:", error?.response?.data)

    toast.error(error?.response?.data?.message || "Google login failed")
  }
}

// const authwithgoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider)

//     const user = result.user

//     // ✅ ADD HERE
//     console.log("FIREBASE USER:", user)

//     const providerData = user.providerData?.[0]

//     const fields = {
//       name: providerData?.displayName || user.displayName,
//       email: providerData?.email || user.email,
//       password: null,
//       avatar: providerData?.photoURL || user.photoURL,
//       mobile: providerData?.phoneNumber || user.phoneNumber || "",
//       role: "USER"
//     }

//     console.log("SENDING DATA:", fields) // ✅ also add this

//     const response = await Axios({
//       ...summaryApi.authwithGoogle,
//       data: fields
//     })

//     if (response.data.success) {
//       localStorage.setItem("user", JSON.stringify(response.data.data.user))
//       toast.success("Login success")
//       navigate("/")
//     }

//   } catch (error) {
//     console.log("ERROR:", error)
//     console.log("BACKEND:", error?.response?.data)

//     toast.error("Google login failed")
//   }
// }
// const authwithgoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider)

//     const user = result.user

//     // ✅ correct data
//     const fields = {
//       name: user.providerData[0].displayName,
//       email: user.providerData[0].email,
//       password: null,
//       avatar: user.providerData[0].photoURL,
//       mobile: user.providerData[0].phoneNumber,
//       role: "USER"
//     }

   

//     // 🔥 API CALL (MOST IMPORTANT)
//     const response = await Axios({
//       ...summaryApi.authwithGoogle,
//       data: fields
//     })
//      console.log("Google Data:", fields)

//     if (response.data.success) {
//       localStorage.setItem("user", JSON.stringify(response.data.data))
//       toast.success("Login success")
//       navigate("/")
//     }

//   } catch (error) {
//     console.log(error)
//     toast.error("Google login failed")
//   }
// }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-gray-100">
        
        {/* LEFT SIDE - FORM */}
        <div className="p-8 lg:p-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600">
                <RiShoppingBag3Line className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Join K's Shopping Mart</h1>
                <p className="text-gray-600 mt-1">Create your account in seconds</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RiShieldCheckLine className="w-5 h-5 text-emerald-500" />
              <span>Your data is 100% secure with us</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaUser className="w-4 h-4 text-emerald-500" />
                Full Name
              </label>
              <div className={`relative rounded-xl transition-all duration-300 ${errors.name ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-200 group-hover:ring-emerald-300 focus-within:ring-2 focus-within:ring-emerald-500'}`}>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder=" Enter Name "
                  className="w-full px-5 py-4 bg-gray-50/50 rounded-xl outline-none text-gray-900 placeholder-gray-500"
                  required
                />
                {data.name && !errors.name && (
                  <GiCheckMark className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                )}
              </div>
              {errors.name && (
                <p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-2 flex items-center gap-2"
                >
                  ⚠️ {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaEnvelope className="w-4 h-4 text-emerald-500" />
                Email Address
              </label>
              <div className={`relative rounded-xl transition-all duration-300 ${errors.email ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-200 group-hover:ring-emerald-300 focus-within:ring-2 focus-within:ring-emerald-500'}`}>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 bg-gray-50/50 rounded-xl outline-none text-gray-900 placeholder-gray-500"
                  required
                />
                {data.email && !errors.email && (
                  <GiCheckMark className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                )}
              </div>
              {errors.email && (
                <p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-2 flex items-center gap-2"
                >
                  ⚠️ {errors.email}
                </p>
              )}
            </div>

            {/* Mobile Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaPhone className="w-4 h-4 text-emerald-500" />
                Mobile Number
              </label>
              <div className={`relative rounded-xl transition-all duration-300 ${errors.mobile ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-200 group-hover:ring-emerald-300 focus-within:ring-2 focus-within:ring-emerald-500'}`}>
                <input
                  type="tel"
                  name="mobile"
                  value={data.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full px-5 py-4 bg-gray-50/50 rounded-xl outline-none text-gray-900 placeholder-gray-500"
                  required
                />
                {data.mobile && !errors.mobile && (
                  <GiCheckMark className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                )}
              </div>
              {errors.mobile && (
                <p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-2 flex items-center gap-2"
                >
                  ⚠️ {errors.mobile}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaLock className="w-4 h-4 text-emerald-500" />
                Password
              </label>
              <div className={`relative rounded-xl transition-all duration-300 ${errors.password ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-200 group-hover:ring-emerald-300 focus-within:ring-2 focus-within:ring-emerald-500'}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full px-5 py-4 bg-gray-50/50 rounded-xl outline-none text-gray-900 placeholder-gray-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <FaRegEye className="w-5 h-5" /> : <FaRegEyeSlash className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {data.password && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Password strength</span>
                    <span className={`font-semibold ${
                      passwordStrength < 50 ? 'text-red-500' :
                      passwordStrength < 75 ? 'text-amber-500' : 'text-emerald-500'
                    }`}>
                      {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong'}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        passwordStrength < 50 ? 'bg-red-500' :
                        passwordStrength < 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
              
              {/* Password Requirements */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {passwordRequirements.map(req => (
                  <div key={req.id} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      req.met ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {req.met && <GiCheckMark className="w-3 h-3" />}
                    </div>
                    <span className={`text-xs ${req.met ? 'text-emerald-700' : 'text-gray-500'}`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
              
              {errors.password && (
                <p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-2 flex items-center gap-2"
                >
                  ⚠️ {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaLock className="w-4 h-4 text-emerald-500" />
                Confirm Password
              </label>
              <div className={`relative rounded-xl transition-all duration-300 ${errors.confirmPassword ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-200 group-hover:ring-emerald-300 focus-within:ring-2 focus-within:ring-emerald-500'}`}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full px-5 py-4 bg-gray-50/50 rounded-xl outline-none text-gray-900 placeholder-gray-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition-colors"
                >
                  {showConfirmPassword ? <FaRegEye className="w-5 h-5" /> : <FaRegEyeSlash className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-2 flex items-center gap-2"
                >
                  ⚠️ {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
          <button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                isLoading || Object.keys(errors).length > 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:shadow-xl hover:shadow-emerald-500/25'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
            {/* Divider */}
<div className="flex items-center gap-4 my-6">
  <div className="flex-1 h-px bg-gray-200"></div>
  <span className="text-sm text-gray-500 font-medium">OR</span>
  <div className="flex-1 h-px bg-gray-200"></div>
</div>

{/* Google Button */}
<button
  type="button"
  onClick={authwithgoogle}
  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="google"
    className="w-5 h-5"
  />
  <span className="font-semibold text-gray-700">
    Continue with Google
  </span>
</button>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - PROMO */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 translate-y-32"></div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-10">
              <h2 className="text-4xl font-bold mb-4">Welcome to Premium Shopping</h2>
              <p className="text-emerald-100 text-lg">
                Join thousands of happy customers shopping with confidence
              </p>
            </div>
            
            {/* Features List */}
            <div className="space-y-6 mb-10">
              {[
                { icon: '🚚', title: 'Fast Delivery', desc: 'Get your orders in minutes' },
                { icon: '🛡️', title: 'Secure Payments', desc: '100% safe transactions' },
                { icon: '⭐', title: 'Premium Quality', desc: 'Curated quality products' },
                { icon: '🎁', title: 'Exclusive Offers', desc: 'Member-only discounts' }
              ].map((feature, index) => (
                <div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm"
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                    <p className="text-emerald-100">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-emerald-100">Happy Customers</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-emerald-100">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

