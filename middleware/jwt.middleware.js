import Jwt from 'jsonwebtoken';

export function getToken(data) {
    var token = Jwt.sign({ email: data }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    return token;
};