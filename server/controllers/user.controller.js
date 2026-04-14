


import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generatedAccessToken from '../utils/generatedAccessToken.js'
import generatedRefreshToken from "../utils/generatedRefreshToken.js"
import uploadImageClodinary from '../utils/uploadImageClodinary.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
import jwt from 'jsonwebtoken'

import generateOTP from '../utils/generateOtp.js'
import forgotPasswordOTP from '../utils/forgotPasswordTemplate.js'

//  REGISTER
export async function registerUserController(request, response) {
    try {
        const { name, email, password, mobile } = request.body

        if (!name || !email || !password || !mobile) {
            return response.status(400).json({
                message: "provide email, name, password,Mobile",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return response.json({
                message: "Already register email",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        // 🔹 OTP GENERATE (ONLY ADDITION)
        const otp = generateOTP()
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)

        const payload = {
            name,
            email,
            password: hashPassword,
            email_otp: otp,
            email_otp_expiry: otpExpiry
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        // 🔹 Verify Email
        await sendEmail({
            sendTo: email,
            subject: "Verify email from K`s Mart",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
            })
        })
    
  const accessToken = generatedAccessToken(newUser._id)
      const refreshToken = await generatedRefreshToken(newUser._id)

        const cookiesOption = {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "Lax"
        }

        response.cookie("accessToken", accessToken, cookiesOption)
        response.cookie("refreshToken", refreshToken, cookiesOption)
        // 🔹 OTP Email (ONLY ADDITION)
        await sendEmail({
            sendTo: email,
            subject: "Your OTP - K's Mart",
            html: forgotPasswordTemplate({
                name,
                otp
            })
        })

        return response.json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// ================= VERIFY EMAIL =================
export async function verifyEmailController(request, response) {
    try {
        const { code } = request.body

        const user = await UserModel.findOne({ _id: code })

        if (!user) {
            return response.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            })
        }

        await UserModel.updateOne({ _id: code }, {
            verify_email: true
        })

        return response.json({
            message: "Verify email done",
            success: true,
            error: false
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: true
        })
    }
}

// ================= LOGIN =================
// export async function loginController(request, response) {
//     try {
//         const { email, password } = request.body

//         if (!email || !password) {
//             return response.status(400).json({
//                 message: "provide email, password",
//                 error: true,
//                 success: false
//             })
//         }

//         const user = await UserModel.findOne({ email })

//         if (!user) {
//             return response.status(400).json({
//                 message: "User not register",
//                 error: true,
//                 success: false
//             })
//         }

//         if (user.status !== "Active") {
//             return response.status(400).json({
//                 message: "Contact to Admin",
//                 error: true,
//                 success: false
//             })
//         }

//         const checkPassword = await bcryptjs.compare(password, user.password)

//         if (!checkPassword) {
//             return response.status(400).json({
//                 message: "Check your password",
//                 error: true,
//                 success: false
//             })
//         }

//         const accesstoken = await generatedAccessToken(user._id)
//         const refreshToken = await genertedRefreshToken(user._id)

//         await UserModel.findByIdAndUpdate(user._id, {
//             last_login_date: new Date()
//         })

//         const cookiesOption = {
//             httpOnly: true,
//             secure: true,
//             sameSite: "None"
//         }

//         response.cookie('accessToken', accesstoken, cookiesOption)
//         response.cookie('refreshToken', refreshToken, cookiesOption)

//         return response.json({
//             message: "Login successfully",
//             error: false,
//             success: true,
//             data: {
//                 accesstoken,
//                 refreshToken
//             }
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false
//         })
//     }
// }
export async function loginController(request, response) {
    try {
        const { email, password } = request.body

        // ✅ Validate input
        if (!email || !password) {
            return response.status(400).json({
                message: "Provide email and password",
                error: true,
                success: false
            })
        }

        // ✅ Check user exists
        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "User not registered",
                error: true,
                success: false
            })
        }

        // Check user status
        if (user.status !== "Active") {
            return response.status(400).json({
                message: "Contact Admin",
                error: true,
                success: false
            })
        }

        //  Handle Google login users (no password)
        if (!user.password) {
            return response.status(400).json({
                message: "Use Google Login",
                error: true,
                success: false
            })
        }

        // ✅ Check password
        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword) {
            return response.status(400).json({
                message: "Incorrect password",
                error: true,
                success: false
            })
        }

        // ✅ Generate tokens (FIXED HERE)
        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        // ✅ Update last login
        await UserModel.findByIdAndUpdate(user._id, {
            last_login_date: new Date()
        })

        // ✅ Cookie options (production ready)
        const cookiesOption = {
            httpOnly: true,
            secure: true,        // HTTPS required (Vercel/Render)
            sameSite: "None",
        
        }

        // ✅ Set cookies
        response.cookie("accessToken", accessToken, cookiesOption)
        response.cookie("refreshToken", refreshToken, cookiesOption)

        // ✅ Success response
        return response.status(200).json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        })
    }
}

<<<<<<< HEAD
=======
// export async function authwithGoogle(request, response) {
//   const { name, email, avatar, mobile, role } = request.body

//   try {
//     console.log("📥 REQ BODY:", request.body)

//     // 🔍 Debug functions
//     console.log("🔧 AccessToken FN:", generatedAccessToken)
//     console.log("🔧 RefreshToken FN:", generatedRefreshToken)

//     const existingUser = await UserModel.findOne({ email })

//     console.log("👤 Existing User:", existingUser)

//     // =========================
//     // ✅ NEW USER
//     // =========================
//     if (!existingUser) {
//       console.log("🆕 Creating new user...")

//       const user = await UserModel.create({
//         name,
//         email,
//         avatar,
//         mobile,
//         signUpwithGoogle: true,
//         role,
//         verify_email: true
//       })

//       console.log("✅ New User Created:", user)

//       const accesstoken = await generatedAccessToken(user._id)
//       console.log("🔑 Access Token Generated")

// const refreshToken = await generatedRefreshToken(user._id)    
//   console.log("🔄 Refresh Token Generated")
//    const cookiesOption = {
//      httpOnly: true,
//      secure: true,       // 🔥 MUST (HTTPS)
//      sameSite: "None",   // 🔥 MUST (cross-origin)
//       // path: "/"
// };

//       response.cookie("accessToken", accesstoken, cookiesOption)
//       response.cookie("refreshToken", refreshToken, cookiesOption)

//       console.log("🍪 Cookies Set")

//       return response.json({
//         message: "Registered & Login success",
//         error: false,
//         success: true,
//         data: {
//           accesstoken,
//           refreshToken,
//           user
//         }
//       })
//     }

//     // =========================
//     // ✅ EXISTING USER LOGIN
//     // =========================
//     else {
//       console.log("🔁 Existing user login...")

//       const accesstoken = await generatedAccessToken(existingUser._id)
//       console.log("🔑 Access Token Generated")

//       const refreshToken = await generatedRefreshToken(existingUser._id)
//       console.log("🔄 Refresh Token Generated")

//       await UserModel.findByIdAndUpdate(existingUser._id, {
//         last_login_date: new Date()
//       })

//       console.log("📅 Updated last login")

//       const cookiesOption = {
//         httpOnly: true,
//         secure: false,
//         sameSite: "Lax"
//       }

//       response.cookie("accessToken", accesstoken, cookiesOption)
//       response.cookie("refreshToken", refreshToken, cookiesOption)

//       console.log("🍪 Cookies Set")

//       return response.json({
//         message: "Login successfully",
//         error: false,
//         success: true,
//         data: {
//           accesstoken,
//           refreshToken,
//           user: existingUser
//         }
//       })
//     }

//   } catch (error) {
//     console.log("❌ ERROR OCCURRED:")
//     console.log(error)

//     return response.status(500).json({
//       message: error.message,
//       error: true,
//       success: false
//     })
//   }
// }


>>>>>>> 11f5e2548f7ecd4ee6fe9010688eab51da0c9c9c


export async function authwithGoogle(req, res) {
  const { name, email, avatar, mobile, role } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    // ✅ Create user if not exists
    if (!user) {
      user = await UserModel.create({
        name,
        email,
        avatar,
        mobile,
        role,
        verify_email: true,
        signUpwithGoogle: true
      });
    } else {
      // ✅ update last login
      await UserModel.findByIdAndUpdate(user._id, {
        last_login_date: new Date()
      });
    }

    // ✅ Generate tokens
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    // ✅ COMMON COOKIE CONFIG (VERY IMPORTANT)
    const cookiesOption = {
      httpOnly: true,
      secure: true,       // 🔥 MUST (HTTPS)
      sameSite: "None",   // 🔥 MUST (cross-origin)
      path: "/"
    };

    // ✅ Set cookies
    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    // ✅ CLEAN RESPONSE (no token needed)
    return res.status(200).json({
      message: "Google login success",
      success: true,
      user
    });

  } catch (error) {
    console.log("❌ Google Auth Error:", error);

    return res.status(500).json({
      message: error.message,
      error: true,
      success: false
    });
  }
}
// export async function authwithGoogle(request, response) {
//   const { name, email, avatar, mobile, role } = request.body

//   try {
//     console.log("📥 REQ BODY:", request.body)

//     // 🔍 Debug functions
//     console.log("🔧 AccessToken FN:", generatedAccessToken)
//     console.log("🔧 RefreshToken FN:", generatedRefreshToken)

//     const existingUser = await UserModel.findOne({ email })

//     console.log("👤 Existing User:", existingUser)

//     // =========================
//     // ✅ NEW USER
//     // =========================
//     if (!existingUser) {
//       console.log("🆕 Creating new user...")

//       const user = await UserModel.create({
//         name,
//         email,
//         avatar,
//         mobile,
//         signUpwithGoogle: true,
//         role,
//         verify_email: true
//       })

//       console.log("✅ New User Created:", user)

//       const accesstoken = await generatedAccessToken(user._id)
//       console.log("🔑 Access Token Generated")

// const refreshToken = await generatedRefreshToken(user._id)    
//   console.log("🔄 Refresh Token Generated")
//    const cookiesOption = {
//      httpOnly: true,
//      secure: true,       // 🔥 MUST (HTTPS)
//       sameSite: "None",   // 🔥 MUST (cross-origin)
// }; 

//       response.cookie("accessToken", accesstoken, cookiesOption)
//       response.cookie("refreshToken", refreshToken, cookiesOption)

//       console.log("🍪 Cookies Set")

//       return response.json({
//         message: "Registered & Login success",
//         error: false,
//         success: true,
//         data: {
//           accesstoken,
//           refreshToken,
//           user
//         }
//       })
//     }

//     // =========================
//     // ✅ EXISTING USER LOGIN
//     // =========================
//     else {
//       console.log("🔁 Existing user login...")

//       const accesstoken = await generatedAccessToken(existingUser._id)
//       console.log("🔑 Access Token Generated")

//       const refreshToken = await generatedRefreshToken(existingUser._id)
//       console.log("🔄 Refresh Token Generated")

//       await UserModel.findByIdAndUpdate(existingUser._id, {
//         last_login_date: new Date()
//       })

//       console.log("📅 Updated last login")

//       const cookiesOption = {
//         httpOnly: true,
//         secure: false,
//         sameSite: "Lax"
//       }

//       response.cookie("accessToken", accesstoken, cookiesOption)
//       response.cookie("refreshToken", refreshToken, cookiesOption)

//       console.log("🍪 Cookies Set")

//       return response.json({
//         message: "Login successfully",
//         error: false,
//         success: true,
//         data: {
//           accesstoken,
//           refreshToken,
//           user: existingUser
//         }
//       })
//     }

//   } catch (error) {
//     console.log("❌ ERROR OCCURRED:")
//     console.log(error)

//     return response.status(500).json({
//       message: error.message,
//       error: true,
//       success: false
//     })
//   }
// }
// ================= LOGOUT =================
// export async function authwithGoogle(req, res) {
//   try {
//     const { name, email, avatar, mobile } = req.body

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         error: true,
//         message: "Email is required"
//       })
//     }

//     let user = await UserModel.findOne({ email })

//     if (!user) {
//       user = new UserModel({
//         name,
//         email,
//         avatar,
//         mobile,
//         password: null,
//         signUpwithGoogle: true,
//         role: "USER",
//         verify_email: true
//       })

//       await user.save()
//     }

//     const accesstoken = await generatedAccessToken(user._id)
//     const refreshToken = await genertedRefreshToken(user._id)

//     user.last_login_date = new Date()
//     await user.save()

//     res.cookie("accessToken", accesstoken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None"
//     })

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None"
//     })

//     return res.json({
//       success: true,
//       message: "Google login success",
//       data: { user, accesstoken, refreshToken }
//     })

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: error.message
//     })
//   }
// }
export async function logoutController(request, response) {
    try {
        const userid = request.userId

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.clearCookie("accessToken", cookiesOption)
        response.clearCookie("refreshToken", cookiesOption)

        await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        })

        return response.json({
            message: "Logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}






// ================= UPLOAD AVATAR =================
export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId
        const image = request.file

        const upload = await uploadImageClodinary(image)

        await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return response.json({
            message: "upload profile",
            success: true,
            error: false,
            data: {
                _id: userId,
                avatar: upload.url
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// ================= UPDATE USER =================
export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId
        const { name, email, mobile, password } = request.body

        let hashPassword = ""

        if (password) {
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name }),
            ...(email && { email }),
            ...(mobile && { mobile }),
            ...(password && { password: hashPassword })
        })

        return response.json({
            message: "Updated successfully",
            error: false,
            success: true,
            data: updateUser
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// ================= FORGOT PASSWORD =================
/**
 * Controller Function to Forgot Password (When User Not Logged In)
 * Flow -> Click on The Forgot Password -> Send The OTP to the User's email (First we had to find that if that user is existing or not!) -> Verify OTP Controller -> If OTP is Valid then Give the option to reset the password -> Reset Password Controller (Take the new password from the user and update it in the database after hashing it)
 * @param {*} req - { email }
 * @param {*} res - { success: true/false, data: {}, message: "OTP Sent to Email Successfully!" / "Error Sending OTP!" }
 */
// export async function forgotPasswordController (req, res) {
//     try {
//         // First Take the Email For the Request Body
//         const { email } = req.body;

//         // Find the email into the database
//         const existingUser = await UserModel.findOne({ email });

//         // If the User is not Found then we had to send the Response that User Not Found with this email
//         if (!existingUser) {
//             return res.status(404).json({
//                 success: false,
//                 data: {},
//                 message: "User Not Found with this email!",
//             });
//         }

//         // Now if the User is Found then we had to send the OTP to the user's email
//         const otp = generateOTP();

//         // Save the OTP to the database with the user id and expired that otp in just 5 minutes
//         existingUser.forgot_password_otp = otp;
//         existingUser.forgot_password_expiry = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

//         // Send the OTP to the user's email
//         await existingUser.save();

//         // Send the email to the user after successful registration
//         try {
//             const sendOtpEmail = await sendEmail({
//                 sendTo: existingUser.email,
//                 subject: "Password Reset OTP",
//                 html: forgotPasswordOTP({
//                     name: existingUser.name,
//                     otp,
//                 }),
//             });
//             sendOtpEmail() && console.log("OTP Email Sent Successfully!");
//         } catch (error) {
//             console.error("Error sending email:", error);
//         }

//         // Return the response to the client
//         return res.status(200).json({
//             success: true,
//             data: {},
//             message: "OTP Sent to Email Successfully!",
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             data: {},
//             message: "Error Sending OTP!",
//             error: error.message,
//         });
//     }
// };


export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        // 1. Validate email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // 2. Check user
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User Not Found with this email!",
            });
        }

        // 3. Generate OTP
        const otp = generateOTP();

        // 4. Save OTP
        existingUser.forgot_password_otp = otp;
        existingUser.forgot_password_expiry = Date.now() + 5 * 60 * 1000;

        await existingUser.save();

        // 5. Send Email
        try {
            await sendEmail({
                sendTo: existingUser.email,
                subject: "Password Reset OTP",
                html: forgotPasswordOTP({
                    name: existingUser.name,
                    otp,
                }),
            });

            console.log("✅ OTP Email Sent Successfully");

        } catch (emailError) {
            console.log("❌ EMAIL ERROR:", emailError);

            return res.status(500).json({
                success: false,
                message: "Failed to send OTP email",
            });
        }

        // 6. Success response
        return res.status(200).json({
            success: true,
            message: "OTP Sent to Email Successfully!",
        });

    } catch (error) {
        console.log("🔥 FORGOT PASSWORD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
// ================= VERIFY FORGOT OTP =================
export async function verifyForgotPasswordOtp(request, response) {
    try {
        const { email, otp } = request.body

        if (!email || !otp) {
            return response.status(400).json({
                message: "Provide required field email, otp.",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        if (new Date() > new Date(user.forgot_password_expiry)) {
            return response.status(400).json({
                message: "Otp is expired",
                error: true,
                success: false
            })
        }

        if (otp !== user.forgot_password_otp) {
            return response.status(400).json({
                message: "Invalid otp",
                error: true,
                success: false
            })
        }

        await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: "",
            forgot_password_expiry: ""
        })

        return response.json({
            message: "Verify otp successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// ================= RESET PASSWORD =================
export async function resetpassword(request, response) {
    try {
        const { email, newPassword, confirmPassword } = request.body

        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "provide required fields email, newPassword, confirmPassword"
            })
        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "newPassword and confirmPassword must be same.",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)

        await UserModel.findOneAndUpdate({ email }, {
            password: hashPassword
        })

        return response.json({
            message: "Password updated successfully.",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// ================= REFRESH TOKEN =================
// export async function refreshToken(request, response) {
//     try {
//         const refreshToken = request.cookies.refreshToken ||
//             request?.headers?.authorization?.split(" ")[1]

//         if (!refreshToken) {
//             return response.status(401).json({
//                 message: "Invalid token",
//                 error: true,
//                 success: false
//             })
//         }

//         const verifyToken = jwt.verify(
//             refreshToken,
//             process.env.SECRET_KEY_REFRESH_TOKEN
//         )

//         const userId = verifyToken._id
//         const newAccessToken = await generatedAccessToken(userId)

//         const cookiesOption = {
//             httpOnly: true,
//             secure: true,
//             sameSite: "None"
//         }

//         response.cookie('accessToken', newAccessToken, cookiesOption)

//         return response.json({
//             message: "New Access token generated",
//             error: false,
//             success: true,
//             data: {
//                 accessToken: newAccessToken
//             }
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false
//         })
//     }
// }
export async function refreshToken(request, response) {
    try {
        const refreshToken =
            request.cookies.refreshToken ||
            request?.headers?.authorization?.split(" ")[1]

        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }
        const verifyToken = jwt.verify(
            refreshToken,
            process.env.SECRET_KEY_REFRESH_TOKEN
        )

        // 🔥 FIXED FIELD NAME
        const userId = verifyToken.id

        const newAccessToken = await generatedAccessToken(userId)

        response.cookie("accessToken", newAccessToken, cookiesOption)

        return response.json({
            message: "New access token generated",
            success: true,
            error: false,
            data: {
                accessToken: newAccessToken
            }
        })

    } catch (error) {
        return response.status(401).json({
            message: "Token expired or invalid",
            error: true,
            success: false
        })
    }
}
// ================= USER DETAILS =================
export async function userDetails(request, response) {
    try {
        const userId = request.userId

        const user = await UserModel
            .findById(userId)
            .select('-password -refresh_token')

        return response.json({
            message: 'user details',
            data: user,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}
