// // const verifyEmailTemplate = ({name,url})=>{
// //     return`
// // <p>Dear ${name}</p>    
// // <p>Thank you for registering Binkeyit.</p>   
// // <a href=${url} style="color:black;background :orange;margin-top : 10px,padding:20px,display:block">
// //     Verify Email
// // </a>
// // `
// // }

// // export default verifyEmailTemplate



// const verifyEmailTemplate = ({ name, url }) => {
//   return `
//   <div style="font-family:Arial, sans-serif">
//     <p>Dear ${name},</p>

//     <p>Thank you for registering with Binkeyit.</p>

//     <a href="${url}" 
//        style="
//          display:inline-block;
//          padding:12px 20px;
//          background:orange;
//          color:black;
//          text-decoration:none;
//          font-weight:600;
//          margin-top:10px;
//        ">
//       Verify Email
//     </a>

//     <p>If you did not create this account, please ignore this email.</p>

//     <p>Thanks,<br/>Binkeyit Team</p>
//   </div>
//   `;
// };

// export default verifyEmailTemplate

// const verifyEmailTemplate = ({ name, url }) => {
//   return `
//   <div style="font-family: Arial, sans-serif; line-height:1.6;">
//     <p>Dear ${name},</p>

//     <p>Thank you for registering with <b>Binkeyit</b>.</p>

//     <a href="${url}" target="_blank"
//        style="
//          display:inline-block;
//          padding:12px 20px;
//          background:orange;
//          color:black;
//          text-decoration:none;
//          font-weight:600;
//          margin-top:10px;
//          border-radius:6px;
//        ">
//       Verify Email
//     </a>

//     <p>If you did not create this account, please ignore this email.</p>

//     <p>Thanks,<br/>Binkeyit Team</p>
//   </div>
//   `;
// };

// export default verifyEmailTemplate;

const verifyEmailTemplate = ({ name, url }) => {
    // return `
    // <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    //     <p>Hello <strong>${name}</strong>,</p>
    //     <p>Thank you for registering with <strong>K's Shopping mart </strong>! Please click the button below to verify your email address:</p>
        
    //     <div style="margin: 25px 0;">
    //         <a href="${url}" 
    //            style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; display: inline-block; font-weight: bold;">
    //            Verify Email Address
    //         </a>
    //     </div>
        
    //     <p style="font-size: 12px; color: #666;">
    //         If the button doesn't work, copy and paste this link into your browser:<br>
    //         <a href="${url}">${url}</a>
    //     </p>
        
    //     <p>If you did not create an account, please ignore this email.</p>
    //     <p>Best regards,<br/><strong>The k'sMart Team</strong></p>
    // </div>
    // `;
return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
    body {
        margin: 0;
        padding: 0;
        background: #f4f6fb;
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
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    .header {
        background: linear-gradient(135deg, #2563eb, #4f46e5);
        padding: 25px;
        text-align: center;
        color: white;
    }

    .header h1 {
        margin: 0;
        font-size: 22px;
    }

    .content {
        padding: 30px 25px;
        text-align: center;
    }

    .content p {
        font-size: 15px;
        color: #555;
        margin: 12px 0;
        line-height: 1.6;
    }

    .button {
        display: inline-block;
        margin: 25px 0;
        padding: 14px 28px;
        background: linear-gradient(135deg, #2563eb, #4f46e5);
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
        font-size: 15px;
    }

    .link-box {
        margin-top: 20px;
        font-size: 12px;
        color: #888;
        word-break: break-all;
    }

    .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        color: #999;
        border-top: 1px solid #eee;
    }

    .brand {
        color: #4f46e5;
        font-weight: bold;
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
            <h1>📧 Verify Your Email</h1>
        </div>

        <div class="content">
            <p>Hello <strong>${name}</strong>,</p>

            <p>Welcome to <strong>K's Shopping Mart</strong> 🎉</p>

            <p>Please confirm your email address to activate your account.</p>

            <a href="${url}" class="button">
                Verify Email
            </a>

            <p>If the button doesn’t work, use this link:</p>

            <div class="link-box">
                <a href="${url}">${url}</a>
            </div>

            <p style="margin-top:20px;">If you didn’t create this account, you can safely ignore this email.</p>
        </div>

        <div class="footer">
            © ${new Date().getFullYear()} <span class="brand">k'sMart</span>. All rights reserved.
        </div>

    </div>
</div>

</body>
</html>`;
  };

export default verifyEmailTemplate;