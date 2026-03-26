
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


/**
 * Function to send email using Gmail SMTP
 */
const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        // 1. Create the transporter (The connection to Gmail)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // 2. Define the email options
        const mailOptions = {
            from: `"K's Mart! 🛒" <${process.env.EMAIL_USER}>`,
            to: sendTo, // This will now work for ANY email address!
            subject: subject,
            html: html,
        };

        // 3. Send the actual email
        const info = await transporter.sendMail(mailOptions);
        
        console.log("Email sent successfully: ", info.messageId);
        return info;

    } catch (error) {
        console.error("Nodemailer Error:", error);
        // We throw the error so the controller's catch block can see it if needed
        throw error; 
    }
};

export default sendEmail;