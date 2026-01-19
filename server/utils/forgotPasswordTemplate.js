// // const forgotPasswordTemplate = ({ name, otp })=>{
// //     return `
// // <div>
// //     <p>Dear, ${name}</p>
// //     <p>You're requested a password reset. Please use following OTP code to reset your password.</p>
// //     <div style="background:yellow; font-size:20px;padding:20px;text-align:center;font-weight : 800;">
// //         ${otp}
// //     </div>
// //     <p>This otp is valid for 1 hour only. Enter this otp in the binkeyit website to proceed with resetting your password.</p>
// //     <br/>
// //     </br>
// //     <p>Thanks</p>
// //     <p>Binkeyit</p>
// // </div>
// //     `
// // }

// // export default forgotPasswordTemplate


// const forgotPasswordTemplate = ({ name, otp }) => {
//   return `
//   <div style="font-family:Arial, sans-serif">
//     <p>Dear ${name},</p>

//     <p>You requested a password reset. Please use the OTP below:</p>

//     <div style="
//       background:#ffeb3b;
//       font-size:24px;
//       padding:15px;
//       text-align:center;
//       font-weight:700;
//       letter-spacing:4px;
//       margin:20px 0;
//     ">
//       ${otp}
//     </div>

//     <p>This OTP is valid for <b>1 hour</b>.</p>
//     <p>Enter this OTP on the Binkeyit website to reset your password.</p>

//     <p>Thanks,<br/>Binkeyit Team</p>
//   </div>
//   `;
// };

// export default forgotPasswordTemplate;




const forgotPasswordTemplate = ({ name, otp }) => {
  return `
  <div style="font-family: Arial, sans-serif; line-height:1.6;">
    <p>Dear ${name},</p>

    <p>You requested a password reset. Please use the OTP below:</p>

    <div style="
      background:#ffeb3b;
      font-size:24px;
      padding:15px;
      text-align:center;
      font-weight:700;
      letter-spacing:4px;
      margin:20px 0;
      border-radius:6px;
      display:inline-block;
      min-width:200px;
    ">
      ${otp}
    </div>

    <p>This OTP is valid for <b>1 hour</b>.</p>

    <p>
      Enter this OTP on the <b>Binkeyit</b> website to reset your password.
    </p>

    <p>
      If you did not request this password reset, please ignore this email.
    </p>

    <p>Thanks,<br/>Binkeyit Team</p>
  </div>
  `;
};

export default forgotPasswordTemplate;
