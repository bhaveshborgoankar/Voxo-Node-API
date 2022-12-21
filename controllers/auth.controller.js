import bcrypt from 'bcryptjs';
import randomstring from 'randomstring';
import Jwt from 'jsonwebtoken';
import { of } from 'await-of';
import { User } from '../models/user.model.js';
import { sendResetPasswordMail } from '../helper/sendMail.js';
import { ReE, ReS } from '../helper/utils.js';

const authController = {

    // Login
    login: async (req, res, next) => {

        try {

            const { email, password } = req.body;
            const [user] = await of(User.findOne({ email: email }))

            if (user !== null) {
                bcrypt.compare(password, user.password, (error, isMatch) => {

                    if (error) {
                        return ReE(res, 404, { msg: "No User Found." })
                    } else {
                        if (isMatch) {
                            var token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
                            return ReS(res, 202, { msg: "Login Successfully", token: token })
                        } else {
                            return ReE(res, 404, "Authentication failed. Incorrect Email or Password")
                        }
                    }
                });
            } else {
                return ReE(res, 404, "Authentication failed. Incorrect Email or Password")
            }

        } catch (error) {
            console.log("error", error);
            ReE(res, 404, { msg: error.message });
        }
    },

    // Register
    register: async (req, res, next) => {

        try {

            const { email, password, name, phone, country } = req.body;
            const [user] = await of(User.create({
                email: email,
                password: password,
                name: name,
                phone: phone,
                country: country
            }));

            return ReS(res, 201, "Successfully Register", user);

        } catch (error) {
            console.log("error", error);
            return ReE(res, 404, error);
        }
    },

    // Forget Password
    forgetPassword: async (req, res, next) => {

        try {

            const { email } = req.body;
            const [result] = await of(User.findOne({ email: email }));

            if (result !== null) {
                const OTP = randomstring.generate({
                    length: 6,
                    charset: 'numeric'
                });

                // Send Mail
                sendResetPasswordMail(result.name, result.email, OTP, "Forgot Password");
                await of(User.updateOne({ email: email }, { $set: { token: OTP } }))
                return ReS(res, 200, { msg: "Successfully sent! Please check your mail." })
            } else {
                return ReE(res, 400, { msg: "User not found" })
            }

        } catch (error) {
            return ReE(res, 400, error.message)
        }

    },

    // Verify OTP
    verifyOTP: async (req, res, next) => {

        try {

            const { otp } = req.body;

            if (otp) {

                const [token, error] = await of(User.findOne({ token: otp }));

                if (error) {
                    return ReE(res, 400, { msg: error.message });
                } else {
                    return ReS(res, 200, { msg: "Valid Token" });
                }

            } else {
                return ReE(res, 400, { msg: "Invalid OTP" });
            }

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        }
    },

    // Reset Password
    resetPassword: async (req, res, next) => {

        try {

            const Otp = req.query.token;
            const [token, err] = await of(User.findOne({ token: Otp }));

            if (Otp !== '') {

                if (token !== null) {

                    const password = req.body.password;
                    const [newPassword] = await of(bcrypt.hashSync(password, 8));
                    const user = await of(User.findByIdAndUpdate(
                        { _id: token._id },
                        { $set: { password: newPassword, token: '' } },
                        { new: true }
                    ));
                    return ReS(res, 200, { msg: 'User password has been reset' });
                }
                else {
                    return ReE(res, 400, { msg: 'Invalid OTP' });
                }
            } else {
                return ReE(res, 400, { msg: 'Invalid OTP' });
            }
        } catch (error) {
            return ReE(res, 400, error.message);
        }
    }
}
export default authController;