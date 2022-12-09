import bcrypt from 'bcryptjs'
import { of } from 'await-of';
import randomstring from 'randomstring';
import nodemailer from 'nodemailer';
import { User } from '../connection/db.js';
import { getToken } from '../middleware/jwt.middleware.js';

// Send Mail
const sendResetPasswordMail = async (name, email, random_string, subject) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
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
            html: `<p>Hii ${name}, please copy this link and <a href="http://localhost:3000/reset_password?random_string=${random_string}">reset your password</a></p>`
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
const authController = {

    // Login
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            await of(User.find({ email: email }, function (err, user) {
                if (err) {
                    res.status(404).send("ERR");
                } else {
                    if (user.length >= 1) {
                        bcrypt.compare(password, user[0].password, (err, isMatch) => {
                            if (err) {
                                res.status(404).json({ message: "Password Not Match", err: err });
                            } else {
                                if (isMatch) {
                                    res.status(200).json({ message: "Successfully Login" });
                                } else {
                                    res.status(404).json({ message: "Password Not Match" });
                                }
                            }
                        });
                    } else {
                        res.status(404).json({ message: "User is not found in records!" });
                    }
                }
            }))
        }
        catch (error) {
            console.log("error", error);
            res.status(404).send(error);
        }
    },

    // Register
    register: async (req, res, next) => {
        try {
            const { email, password, name, phone, confirm_password } = req.body;
            if (!email || !password || !name || !phone || !confirm_password) {
                res.status(404).json({ message: "All fields are required" });
            } else {
                if (password !== confirm_password) res.status(404).send({ message: "Password not match" });
                else {
                    const user = await of(User.create({
                        email: email,
                        password: password,
                        name: name,
                        phone: phone,
                        token: getToken(email)
                    }));
                    res.status(201).json({ message: "Successfully Register", data: user, token: getToken(email) });
                }
            }
        } catch (error) {
            console.log("error", error);
            res.status(404).json({ message: error });
        }
    },

    // ForgetPassword
    forget_password: async (req, res, next) => {
        try {
            const { email } = req.body;
            const [result] = await of(User.findOne({ email: email }));
            if (result !== null) {
                const random_String = randomstring.generate();
                let subject = "Forgot Password";
                sendResetPasswordMail(result.name, result.email, random_String, subject);
                const data = await of(User.updateOne({ email: email }, { $set: { random_string: random_String } }))
                res.status(200).json({ message: "Successfully sent! Please check your mail.", data: data });
            } else {
                res.status(400).json({ message: "User not found" });
            }
        } catch (err) {
            console.log("Forget Password Error", err);
            res.status(400).json({ message: err.message });
        }
    },

    //Reset Password
    reset_password: async (req, res, next) => {
        try {
            const random_string = req.query.random_string;
            const tokenData = await of(User.findOne({ random_string: random_string }));
            if (random_string !== '') {
                if (tokenData[0] !== null) {
                    const password = req.body.password;
                    const newPassword = await of(bcrypt.hashSync(password, 8));
                    const userData = await of(User.findByIdAndUpdate({ _id: tokenData[0]._id }, { $set: { password: newPassword[0], random_string: '' } }, { new: true }));
                    res.status(200).json({ message: 'User password has been reset', data: userData });
                }
                else {
                    res.status(400).json({ message: 'Link has been expired' });
                }
            } else {
                res.status(400).json({ message: 'Link has been expired' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
export default authController;