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




// const forgotPasswordTemplate = ({ name, otp }) => {
//   return `
//   <div style="font-family: Arial, sans-serif; line-height:1.6;">
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
//       border-radius:6px;
//       display:inline-block;
//       min-width:200px;
//     ">
//       ${otp}
//     </div>

//     <p>This OTP is valid for <b>1 hour</b>.</p>

//     <p>
//       Enter this OTP on the <b>Binkeyit</b> website to reset your password.
//     </p>

//     <p>
//       If you did not request this password reset, please ignore this email.
//     </p>

//     <p>Thanks,<br/>Binkeyit Team</p>
//   </div>
//   `;
// };

// export default forgotPasswordTemplate;


const forgotPasswordOTP = ({ name, otp }) => {
//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Forgot Password OTP</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//         }
//         .container {
//             max-width: 600px;
//             margin: 50px auto;
//             background-color: #fff;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }
//         h1 {
//             color: #333;
//         }
//         p {
//             font-size: 16px;
//             color: #555;
//         }
//         .otp {
//             font-size: 24px;
//             font-weight: bold;
//             color: #007BFF;
//             margin: 20px 0;
//         }
//         .footer {
//             font-size: 12px;
//             color: #999;
//             margin-top: 30px;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h1>Forgot Password OTP</h1>
//         <p>Dear ${name.charAt(0).toUpperCase() + name.slice(1)}!,</p>
//         <p>You have requested to reset your password. Please use the following One-Time Password (OTP) to proceed with resetting your password:</p>
//         <div class="otp">${otp}</div>
//         <p>This OTP is valid for the next 5 minutes. If you did not request a password reset, please ignore this email.</p>
//         <p>Best regards,<br>k'sMart Team</p>
//         <div class="footer">
//             &copy; ${new Date().getFullYear()} Harshil's Blinktit Team. All rights reserved.
//         </div>
//     </div>
// </body>
// </html>`;
// };
return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset OTP</title>

<style>
    body {
        margin: 0;
        padding: 0;
        background: #f2f5f9;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .wrapper {
        width: 100%;
        padding: 40px 0;
    }

    .container {
        max-width: 520px;
        margin: auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
    }

    .header {
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        padding: 25px;
        text-align: center;
        color: #fff;
    }

    .header h1 {
        margin: 0;
        font-size: 22px;
        letter-spacing: 0.5px;
    }

    .content {
        padding: 30px 25px;
        text-align: center;
    }

    .content p {
        color: #555;
        font-size: 15px;
        line-height: 1.6;
        margin: 10px 0;
    }

    .otp-box {
        margin: 25px auto;
        padding: 15px 20px;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 6px;
        color: #4f46e5;
        background: #f4f6ff;
        border-radius: 10px;
        display: inline-block;
    }

    .warning {
        font-size: 13px;
        color: #888;
        margin-top: 15px;
    }

    .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #999;
        border-top: 1px solid #eee;
    }

    .brand {
        font-weight: bold;
        color: #4f46e5;
    }

    @media(max-width: 600px) {
        .container {
            margin: 10px;
        }
    }
</style>

</head>

<body>

<div class="wrapper">
    <div class="container">

        <div class="header">
            <h1>🔐 Password Reset Request</h1>
        </div>

        <div class="content">
            <p>Hello <strong>${name.charAt(0).toUpperCase() + name.slice(1)}</strong>,</p>

            <p>We received a request to reset your password. Use the OTP below to continue:</p>

            <div class="otp-box">${otp}</div>

            <p>This OTP is valid for <strong>5 minutes</strong>.</p>

            <p class="warning">If you didn’t request this, you can safely ignore this email.</p>
        </div>

        <div class="footer">
            © ${new Date().getFullYear()} <span class="brand">k'sMart</span>. All rights reserved.
        </div>

    </div>
</div>

</body>
</html>`;
}

export default forgotPasswordOTP;