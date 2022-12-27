import { of } from 'await-of';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user.model.js';

export const validateLogin = [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        next();
    }
]

// Check weather email is exist or not.
const isEmailExist = async (req, res, next) => {
    await of(User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            res.status(404).send("ERR");
        }
        if (user) {
            var err = new Error('A user with that email has already registered. Please use a different email..');
            err.status = 400;
            return next(err);
        } else {
            next();
        }
    }));
}

export { isEmailExist };