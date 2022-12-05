import Jwt from 'jsonwebtoken';

export function getToken(data) {
    var token = Jwt.sign({ email: data }, 'voxo-secret', { expiresIn: "1h" })
    return token;
}