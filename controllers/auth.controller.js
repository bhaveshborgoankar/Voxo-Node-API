import { User } from '../connection/db.js';
import bcrypt from 'bcryptjs'
import { Jwt } from 'jsonwebtoken';

const authController = {
    //Login
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body
            User.find({ email: email }, function (err, user) {
                if (err) {
                    res.status(404).send("ERR")
                } else {
                    if (user.length >= 1) {
                        bcrypt.compare(password, user[0].password, (err, isMatch) => {
                            if (err) {
                                res.status(404).json({ message: "Password Not Match", err: err })
                            } else {
                                if (isMatch) {
                                    Jwt.sign()
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

    //Register
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
                        // if we want to add this field to database then we need to convert in bcrypt.
                        // confirm_password: confirm_password,
                        name: name,
                        phone: phone
                    })
                    res.status(200).json({ message: "Successfully Register", data: user })
                }
            }
        } catch (error) {
            console.log("error", error)
            res.status(404).json({ message: error })
        }
    }
}
export default authController;