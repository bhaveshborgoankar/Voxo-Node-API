import { of } from 'await-of';
import Jwt from 'jsonwebtoken';
import { ReE } from "../helper/utils.js";
import { User } from '../models/user.model.js';

export const checkAuthentication = async (req, res, next) => {

    var token = req.headers.authorization;

    if (!token || token === undefined) {
        return ReE(res, 201, { msg: 'Please send Bearer token' })
    }

    token = req.headers.authorization.split(' ')[1];

    if (token) {

        Jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {

            if (err) {
                return ReE(res, 501, { msg: err.message })
            } else {

                const user = decoded._id
                const [result, error] = await of(User.findById(user))

                if (error) {
                    return ReE(res, 400, { msg: error.message })
                } else {
                    next();
                }
            }
        })
    } else {
        return ReE(res, 404, { msg: 'Please send Bearer token' })
    }
}