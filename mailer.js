import { createTransport } from "nodemailer";
import { config } from "dotenv";

config()

console.log(
  "host,port,auth",
  process.env.MAIL_HOST,
  process.env.MAIL_PORT,
  process.env.MAIL_USER,
  process.env.MAIL_PASS
);

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: params.to,
      subject: "Hello ✔",
      html: `
          <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
          >
            <h2>Krato solutions</h2>
            <h4>You are officially In ✔</h4>
            <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
       </div>
        `,
    });
    return info;
  } catch (error) {
    return false;
  }
};
