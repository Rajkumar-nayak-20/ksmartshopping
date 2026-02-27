// import dotenv from "dotenv";
// import { Resend } from "resend";

// dotenv.config();

// if (!process.env.RESEND_API) {
//   console.log("Provide RESEND_API inside the .env file");
// }

// const resend = new Resend(process.env.RESEND_API);

// const sendEmail = async ({ sendTo, subject, html }) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "K-cart <onboarding@resend.dev>", // ✅ SAFE
//       to: sendTo,
//       subject,
//       html
//     });

//     if (error) {
//       console.error("Email error:", error);
//       return null;
//     }

//     return data;
//   } catch (error) {
//     console.log("Send email failed:", error);
//     return null;
//   }
// };

// export default sendEmail;


// // import dotenv from "dotenv";
// // dotenv.config();
// // import nodemailer from "nodemailer";
// // import fs from "fs";
// // import path from "path";
// // import handlebars from "handlebars";

// // const htmlFilePath = path.join(process.cwd(), 'email.html');
// // const htmlFileContent = fs.readFileSync(htmlFilePath, 'utf-8');

// // const sendEmail = async (token, email) => {
// //         const template = handlebars.compile(htmlFileContent);

// //     const htmlTOSend = template({
// //         VERIFY_LINK: `http://localhost:8181/api/users/verify-email/${token}`
// //     });
// //     // First Create the Transpoter
// //     const transporter = nodemailer.createTransport({
// //         service: 'gmail',
// //         auth: {
// //             user: process.env.EMAIL,
// //             pass: process.env.PASSWORD
// //         }
// //     })
// //     // Create the mail configrations
// //     const mailConfigrations = {
// //         from: process.env.EMAIL,
// //         to: email,
// //         subject: 'Verify Your Email',
// //         html : htmlTOSend,
// //     }
// //     // Send the email
// //     transporter.sendMail(mailConfigrations, (err, info) => {
// //         if (err) {
// //             throw new Error(err);
// //         } else {
// //             console.log('Email sent: ' + info.response);
// //         }
// //     })
// // }

// // export default sendEmail;



import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    });

    console.log("Email Sent:", info.response);
  } catch (error) {
    console.log("Error:", error);
  }
};

export default sendEmail;