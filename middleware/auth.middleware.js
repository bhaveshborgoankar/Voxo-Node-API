import { ResponseValidator } from '../helper/ResponseValidator.js';

export const AuthMiddleware = {

    login: async (req, res, next) => {

        const loginRules = {
            "email": "required|string|email",
            "password": "required|string|min:8",
        };

        return ResponseValidator(req, loginRules, res, next);
    },

    register: async (req, res, next) => {

        const registerRules = {
            "email": "required|string|email",
            "name": "required|string",
            "phone": "required|string",
            "password": "required|string|min:8",
            "confirm_password": "required|same:password"
        };

        return ResponseValidator(req, registerRules, res, next);
    },

    forgotPassword: async (req, res, next) => {

        const forgotPasswordRule = {
            "email": "required|string|email"
        };

        return ResponseValidator(req, forgotPasswordRule, res, next);
    },

    verifyOtp: async (req, res, next) => {

        const verifyOtpRule = {
            "otp": "required|string",
            "email": "required|string|email",
        };

        return ResponseValidator(req, verifyOtpRule, res, next);
    },

    updatePassword: async (req, res, next) => {

        const updatePasswordRules = {
            "email": "required|string|email",
            "otp": "required|string",
            "password": "required|string|min:8",
            "confirm_password": "required|same:password"
        };

        return ResponseValidator(req, updatePasswordRules, res, next);

    }
};