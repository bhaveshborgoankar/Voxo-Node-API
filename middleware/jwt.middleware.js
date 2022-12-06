import Jwt from 'jsonwebtoken';

export function getToken(data) {
    console.log("process.env", process.env)
    var token = Jwt.sign({ email: data }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    return token;
}