import { of } from 'await-of';
import { body, validationResult } from 'express-validator'
import { User } from '../connection/db.js';

export const validateLogin = [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    }
]
const FinalResult = checkValidationResult
function checkValidationResult(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ message: errors });
    } else {
        next();
    }

}
// const isEmailExist = isEmail
const isEmailExist = async (req, res, next) => {
    console.log("req.body29", req.body);
    await of(User.findOne({ email: req.body.email }, function (err, user) {
        console.log("34User", user);
        if (err) {
            console.log("errrrrrrrrrrrrrrrrrrrrrrr");
            res.status(404).send("ERR")
        }
        if (user) {
            var err = new Error('A user with that email has already registered. Please use a different email..')
            err.status = 400;
            return next(err);
        } else {
            console.log("kfdjgbjkhifdgbjh")
            next();
        }
    }));
}

export {
    FinalResult, isEmailExist
}

