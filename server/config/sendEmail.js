import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.RESEND_API) {
  console.log("Provide RESEND_API inside the .env file");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "K-cart <onboarding@resend.dev>", // ✅ SAFE
      to: sendTo,
      subject,
      html
    });

    if (error) {
      console.error("Email error:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.log("Send email failed:", error);
    return null;
  }
};

export default sendEmail;
