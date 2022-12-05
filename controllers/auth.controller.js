import { User } from '../connection/db.js';
import bcrypt from 'bcryptjs'
import { getToken } from '../middleware/jwt.middleware.js';
import { of } from 'await-of';
import randomstring from 'randomstring';
import nodemailer from 'nodemailer'
const sendResetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            // host: 'smtp.ethereal.email',
            post: 3000,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'webapp342@gmail.com',
                pass: 'web@#342'
            }
        })
        const mailOption = {
            from: 'webapp342@gmail.com',
            to: email,
            subject: "For Reset Password",
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
            // html: `<p>Hii ${name}, please click this link <a href="http://localhost:3000/reset_password?token=${token}"> to reset your password</a></p>`
        }
        transporter.sendMail(mailOption, function (err, info) {
            if (err) {
                console.log("Mail Error:", err)
            } else {
                console.log('Mail has been sent', info.response);
            }
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const authController = {
    // Login
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body
            await of(User.find({ email: email }, function (err, user) {
                if (err) {
                    res.status(404).send("ERR");
                } else {
                    if (user.length >= 1) {
                        bcrypt.compare(password, user[0].password, (err, isMatch) => {
                            if (err) {
                                res.status(404).json({ message: "Password Not Match", err: err })
                            } else {
                                if (isMatch) {
                                    res.status(200).json({ message: "Successfully Login" })
                                } else {
                                    res.status(404).json({ message: "Password Not Match" })
                                }
                            }
                        });
                    } else {
                        res.status(404).json({ message: "User is not found in records!" })
                    }
                }
            }))
        }
        catch (error) {
            console.log("error", error)
            res.status(404).send(error)
        }
    },

    // Register
    register: async (req, res, next) => {
        try {
            const { email, password, name, phone, confirm_password } = req.body;
            if (!email || !password || !name || !phone || !confirm_password) {
                res.status(404).json({ message: "All fields are required" });
            } else {
                if (password !== confirm_password) res.status(404).send({ message: "Password not match" })
                else {
                    const user = await of(User.create({
                        email: email,
                        password: password,
                        name: name,
                        phone: phone,
                        token: getToken(email)
                    }))
                    res.status(200).json({ message: "Successfully Register", data: user, token: getToken(email) })
                }
            }
        } catch (error) {
            console.log("error", error)
            res.status(404).json({ message: error })
        }
    },

    // ForgetPassword
    forget_password: async (req, res, next) => {
        try {
            const { email } = req.body
            const [result] = await of(User.findOne({ email: email }))
            console.log("result", result);
            if (result !== null) {
                const randomString = randomstring.generate();
                const data = await of(User.updateOne({ email: email }, { $set: { token: randomString } }))
                sendResetPasswordMail(data.name, data.email, randomString)
                res.status(200).json({ message: "Data sent to email! Please check your email", data: data })
            } else {
                res.status(400).json({ message: "User not found" })
            }
        } catch (err) {
            console.log("Forget Password Error", err)
            res.status(400).json({ message: err.message })
        }
    }
}
export default authController;