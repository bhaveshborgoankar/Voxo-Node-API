import nodemailer from 'nodemailer';
import { emailTamplate } from './emailTemplate.js';

// Send Mail
export const sendResetPasswordMail = async (name, email, OTP, subject) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            },
        });
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: subject,
            text: '',
            html: emailTamplate(name, OTP)
        };
        await transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log("Mail not sent!");
            } else {
                console.log({ info: info, message: "Successfully sent! Please check your mail." });
            }
        });
    } catch (error) {
        console.log({ message: error.message })
    }
}
