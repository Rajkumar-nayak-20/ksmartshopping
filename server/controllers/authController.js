import sendEmail from "../utils/sendEmail.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../emailTemplates/forgotPasswordTemplate.js";
import User from "../models/User.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // generate OTP
    const otp = generatedOtp();

    // save otp in DB
    user.forgotPasswordOtp = otp;
    user.forgotPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

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
