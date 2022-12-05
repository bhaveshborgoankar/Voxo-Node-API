import { User } from '../connection/db.js';
import bcrypt from 'bcryptjs'
import { getToken } from '../middleware/jwt.middleware.js';

const authController = {
    // Login
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body
            User.find({ email: email }, function (err, user) {
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
            })
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
                    const user = User.create({
                        email: email,
                        password: password,
                        name: name,
                        phone: phone,
                        token: getToken(email)
                    })
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
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    console.log("ERRRR", err)
                } else {
                    if (user !== null) {
                        res.status(201).json({ data: email })
                    } else {
                        res.status(400).json({ message: "User not Exist!" })
                    }
                }
            })
        } catch (err) {
            console.log("Forget Password Error", err)
            res.status(400).json({ message: err.message })
        }
    }
}
export default authController;