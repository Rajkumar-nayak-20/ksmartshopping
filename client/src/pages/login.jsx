import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userslice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase"; // adjust path
/* = VALIDATION REGEX == */
const emailRegex =
  /^[a-z][a-z0-9._%+-]*@[a-z][a-z0-9-]*\.[a-z]{2,}(\.[a-z]{2,})?$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ================= VALIDATION FLAGS ================= */
  const isValidEmail = emailRegex.test(data.email);
  const isValidPassword = passwordRegex.test(data.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!isValidPassword) {
      toast.error(
        "Password must be at least 8 characters and include uppercase and lowercase letters",
      );
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        // const userDetails = await fetchUserDetails()
        // dispatch(setUserDetails(userDetails.data))
        const userDetails = await fetchUserDetails();

        dispatch(setUserDetails(userDetails));

        setData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("FIREBASE USER:", user);

      const payload = {
        name: user.displayName,
        email: user.email,
        password: null,
        avatar: user.photoURL,
        mobile: user.phoneNumber || "",
        role: "USER",
      };

      console.log("SENDING DATA:", payload);

      const response = await Axios({
        ...SummaryApi.authwithGoogle,
        data: payload,
      });

      if (response.data.success) {
        toast.success("Login success");

        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        // const userDetails = await fetchUserDetails()
        // dispatch(setUserDetails(userDetails.data))
        const userDetails = await fetchUserDetails();

        dispatch(setUserDetails(userDetails));

        navigate("/");
      }
    } catch (error) {
      console.log("ERROR:", error);
      console.log("BACKEND:", error?.response?.data);

      toast.error(error?.response?.data?.message || "Google login failed");
    }
  };

  //   return (
  //     <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-white px-4">

  //       {/* MAIN CONTAINER */}
  //       <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

  //         {/* LEFT : LOGIN FORM */}
  //         <div className="p-8">

  //           {/* Heading */}
  //           <div className="text-center mb-6">
  //             <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
  //             <p className="text-sm text-gray-500 mt-1">Login to continue</p>
  //           </div>

  //           <form className="grid gap-6" onSubmit={handleSubmit}>

  //             {/* Email */}
  //             <div>
  //               <label className="text-sm font-medium text-gray-600 mb-1 block">
  //                 Email Address
  //               </label>

  //               <input
  //                 type="email"
  //                 name="email"
  //                 value={data.email}
  //                 onChange={handleChange}
  //                 placeholder="Enter your email"
  //                 className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent
  //                   text-sm placeholder-gray-400
  //                   focus:bg-white focus:border-green-600
  //                   focus:ring-2 focus:ring-green-500/40 outline-none"
  //               />

  //               {data.email && !isValidEmail && (
  //                 <p className="text-xs text-red-500 mt-1">
  //                   Please enter a valid email address
  //                 </p>
  //               )}
  //             </div>

  //             {/* Password */}
  //             <div>
  //               <label className="text-sm font-medium text-gray-600 mb-1 block">
  //                 Password
  //               </label>

  //               <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 border border-transparent
  //                 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-500/40">
  //                 <input
  //                   type={showPassword ? "text" : "password"}
  //                   name="password"
  //                   value={data.password}
  //                   onChange={handleChange}
  //                   placeholder="Enter your password"
  //                   className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
  //                 />

  //                 <span
  //                   onClick={() => setShowPassword(prev => !prev)}
  //                   className="cursor-pointer text-gray-500"
  //                 >
  //                   {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
  //                 </span>
  //               </div>

  //               {data.password && !isValidPassword && (
  //                 <p className="text-xs text-red-500 mt-1">
  //                   Password must contain uppercase, lowercase and be at least 8 characters
  //                 </p>
  //               )}

  //               <Link
  //                 to="/forgot-password"
  //                 className="block text-right text-sm text-green-700 mt-2 font-medium"
  //               >
  //                 Forgot password?
  //               </Link>
  //             </div>

  //             {/* Button */}
  //             <button
  //               disabled={!valideValue}
  //               className={`w-full py-3 rounded-xl font-semibold transition-all
  //                 ${valideValue
  //                   ? "bg-gradient-to-r from-green-700 to-green-600 hover:scale-[1.02]"
  //                   : "bg-gray-400 cursor-not-allowed"}
  //                 text-white`}
  //             >
  //               Login
  //             </button>
  //           </form>

  //           {/* Footer */}
  //           <p className="text-center text-sm text-gray-600 mt-6">
  //             Don&apos;t have an account?
  //             <Link to="/register" className="ml-1 font-semibold text-green-700">
  //               Register
  //             </Link>
  //           </p>
  //         </div>

  //         {/* OR Divider */}
  // {/* <div className="flex items-center gap-3 my-4">
  //   <div className="flex-1 h-[1px] bg-gray-300"></div>
  //   <span className="text-sm text-gray-500">OR</span>
  //   <div className="flex-1 h-[1px] bg-gray-300"></div>
  // </div> */}

  // {/* Google Login Button */}
  // <button
  //   onClick={handleGoogleLogin}
  //   className="w-full py-3 rounded-xl border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
  // >
  //   <img
  //     src="https://www.svgrepo.com/show/475656/google-color.svg"
  //     alt="google"
  //     className="w-5 h-5"
  //   />
  //   <span className="font-medium text-gray-700">
  //     Continue with Google
  //   </span>
  // </button>

  //         {/* RIGHT PANEL (SAME AS REGISTER) */}
  //           {/* <div className="hidden md:flex items-center justify-center bg-[#328c44] text-white p-6">
  //           <div className="text-center">
  //             <h2 className="text-2xl font-extrabold mb-2">K’s Shopping Mart</h2>
  //             <p className="text-sm text-green-100">
  //               Secure • Fast • Premium Shopping Experience
  //             </p>
  //           </div>
  //         </div> */}

  //       </div>
  //     </section>
  //   )
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-white px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-sm text-gray-500 mt-1">Login to continue</p>
        </div>

        {/* FORM */}
        <form className="grid gap-5" onSubmit={handleSubmit}>
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
            focus:ring-2 focus:ring-green-500/40 outline-none transition"
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

            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 border border-transparent
            focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-500/40"
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full outline-none text-sm bg-transparent placeholder-gray-400"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-gray-500"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>

            {data.password && !isValidPassword && (
              <p className="text-xs text-red-500 mt-1">
                Password must contain uppercase, lowercase and be at least 8
                characters
              </p>
            )}

            <Link
              to="/forgot-password"
              className="block text-right text-sm text-green-700 mt-2 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <button
            disabled={!valideValue}
            className={`w-full py-3 rounded-xl font-semibold transition-all
            ${
              valideValue
                ? "bg-gradient-to-r from-green-700 to-green-600 hover:scale-[1.03] shadow-md"
                : "bg-gray-400 cursor-not-allowed"
            }
            text-white`}
          >
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

<<<<<<< HEAD
        {/* GOOGLE BUTTON */}
        {/* <button
=======
        {/* LOGIN BUTTON */}
        <button
          disabled={!valideValue}
          className={`w-full py-3 rounded-xl font-semibold transition-all
            ${valideValue
              ? "bg-gradient-to-r from-green-700 to-green-600 hover:scale-[1.03] shadow-md"
              : "bg-gray-400 cursor-not-allowed"}
            text-white`}
        >
          Login
        </button>
      </form>

      {/* DIVIDER */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-[1px] bg-gray-300"></div>
        <span className="text-sm text-gray-500">OR</span>
        <div className="flex-1 h-[1px] bg-gray-300"></div>
      </div>

      {/* GOOGLE BUTTON */}
      {/* <button
>>>>>>> 11f5e2548f7ecd4ee6fe9010688eab51da0c9c9c
        onClick={handleGoogleLogin}
        className="w-full py-3 rounded-xl border border-gray-300 flex items-center justify-center gap-3 
        hover:bg-gray-100 transition-all shadow-sm hover:shadow-md"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        <span className="font-medium text-gray-700">
          Continue with Google
        </span>
      </button> */}

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?
          <Link to="/register" className="ml-1 font-semibold text-green-700">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
