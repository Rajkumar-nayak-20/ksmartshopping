// const generatedOtp = ()=>{
//     return Math.floor(Math.random() * 900000) + 100000  /// 100000 to 999999
// }
// export default generatedOtp

// const generatedOtp = () => {
//   return Math.floor(Math.random() * 900000) + 100000; // 6 digit OTP
// };

// export default generatedOtp;
const generateOTP = () => {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

export default generateOTP;