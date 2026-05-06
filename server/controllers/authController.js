import sendEmail from "../utils/sendEmail.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../emailTemplates/forgotPasswordTemplate.js";
import User from "../models/User.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    //await ko hm kar rahe hai kyunki hume database se user ko find karna hai aur ye ek asynchronous operation hai. Agar user nahi milta hai toh 404 status code ke sath "User not found" message return karenge.
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // generate OTP
    const otp = generateOtp();

    // save otp in DB
    user.forgotPasswordOtp = otp;
    user.forgotPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();//await ko hm kar rahe hai kyunki hume user ko save karna hai database me aur ye ek asynchronous operation hai.

    // send email
    await sendEmail({
      sendTo: user.email,
      subject: "Binkeyit Password Reset OTP",
      html: forgotPasswordTemplate({
        name: user.name,
        otp,
      }),
    });

    return res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
