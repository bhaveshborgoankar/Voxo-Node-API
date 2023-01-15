import bcrypt from 'bcryptjs';
import randomstring from 'randomstring';
import Jwt from 'jsonwebtoken';
import { of } from 'await-of';
import { User } from '../models/user.model.js';
import { sendResetPasswordMail } from '../helper/sendMail.js';
import { ReE, ReS } from '../helper/utils.js';

const authController = {

    // Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const [user, userError] = await of(User.findOne({ email: email }))
            if (userError) throw userError;

            if (user) {
                bcrypt.compare(password, user.password, (error, isMatch) => {
                    if (error) {
                        return ReE(res, 404, { msg: "No User Found." });
                    } else {
                        if (isMatch) {
                            var token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "48h" });
                            return ReS(res, 200, { msg: "Login Successfully", token: token });
                        } else {
                            return ReE(res, 404, { msg: "Authentication failed. Incorrect Email or Password" });
                        }
                    }
                });
            } else {
                return ReE(res, 404, { msg: "Authentication failed. Incorrect Email or Password" });
            }

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Register
    register: async (req, res) => {
        try {
            const { email, password, name, phone } = req.body;
            const [user] = await of(User.create({
                email: email,
                password: password,
                name: name,
                phone: phone
            }));

            return ReS(res, 201, "User Registered Successfully", user);
        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Forget Password
    forgetPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const [result, resultError] = await of(User.findOne({ email: email }));

            if (resultError) throw resultError;

            if (result) {
                const OTP = randomstring.generate({
                    length: 6,
                    charset: 'numeric'
                });

                // Send Mail
                sendResetPasswordMail(result.name, result.email, OTP, "Forgot Password");
                await of(User.updateOne({ email: email }, { $set: { token: OTP } }));

                return ReS(res, 200, { msg: "Successfully sent! Please check your mail." });

            } else {
                return ReE(res, 400, { msg: "User not found" });
            }

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Verify OTP
    verifyOTP: async (req, res) => {
        try {
            const { otp, email } = req.body;
            if (email) {

                const [isUser, userError] = await of(User.findOne({ email: email, token: otp }));

                if (userError) throw userError;

                if (isUser) {
                    return ReS(res, 200, { msg: "Valid OTP" });
                } else {
                    return ReE(res, 400, { msg: 'Invalid OTP' });
                }

            } else {
                return ReE(res, 400, { msg: 'User not found' });
            }
        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        }
    },

    // Reset Password
    resetPassword: async (req, res) => {
        try {

            const { email, password, confirm_password, otp } = req.body;
            const [user, userError] = await of(User.findOne({ email: email, token: otp }));

            if (userError) throw userError

            if (user) {

                const [newPassword] = await of(bcrypt.hashSync(password, 8));
                const [updatePassword, updatePasswordError] = await of(User.findByIdAndUpdate(
                    { _id: user._id },
                    { $set: { password: newPassword, token: '' } },
                    { new: true }
                ));

                if (updatePasswordError) throw updatePasswordError;

                return ReS(res, 200, { msg: 'User password has been reset' });

            } else {
                return ReE(res, 401, { msg: "Invalid OTP" });
            }

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    }

}
export default authController;