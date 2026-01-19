import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Otpverification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  const email = location?.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const validValue = data.every((el) => el);

  /* ================= OTP CHANGE ================= */
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newData = [...data];
    newData[index] = value;
    setData(newData);

    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  /* ================= PASTE HANDLER ================= */
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(pasteData)) {
      toast.error("Please paste a valid 6-digit OTP");
      return;
    }

    setData(pasteData.split(""));
    inputRef.current[5]?.focus();
  };

  /* ================= CLEAR OTP ================= */
  const handleClear = () => {
    setData(["", "", "", "", "", ""]);
    inputRef.current[0]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validValue) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      const response = await Axios({
        ...summaryApi.forgot_Password_otp_verification,
        data: {
          otp: data.join(""),
          email: email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);

        navigate("/reset-password", {
          state: {
            data: response.data,
            email: email,
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-white px-4">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT : OTP FORM */}
        <div className="p-8 flex flex-col justify-center">

          {/* Header */}
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Enter OTP
            </h2>
            <p className="text-sm text-gray-500">
              Please enter the 6-digit code sent to your email
            </p>
          </div>

          <form className="grid gap-6" onSubmit={handleSubmit}>

            {/* OTP Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-3">
                Verification Code
              </label>

              <div
                className="flex justify-between gap-3"
                onPaste={handlePaste}
              >
                {data.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    ref={(ref) => (inputRef.current[index] = ref)}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    maxLength={1}
                    className="
                      w-full max-w-14 h-14
                      text-center text-lg font-bold
                      bg-gray-50
                      border border-transparent
                      rounded-xl
                      shadow-sm
                      outline-none
                      focus:bg-white
                      focus:border-[#00a040]
                      focus:ring-2 focus:ring-[#00a040]/40
                      transition-all duration-200
                    "
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid gap-3">
              <button
                disabled={!validValue}
                className={`w-full py-3 rounded-xl font-semibold transition-all text-white
                  ${validValue
                    ? "bg-gradient-to-r from-[#00a040] to-green-600 hover:scale-[1.02]"
                    : "bg-gray-400 cursor-not-allowed"}
                `}
              >
                Verify OTP
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="w-full py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Clear OTP
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-[#00a040] font-semibold hover:underline"
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
  );
};

export default Otpverification;
