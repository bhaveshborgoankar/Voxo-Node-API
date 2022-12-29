import validator from '../helper/validator.js';

const registerValid = async (req, res, next) => {

    const validationRule = {
        // For Login
        // "email": "required|string|email",
        // "password": "required|string|min:6",

        "email": "required|string|exist:User,email",
        "name": "required|string",
        "phone": "required|string",
        "password": "required|string|min:6",
    };

    console.log("🚀 ~ file: validator.middleware.js:4 ~ registerValid ~ req, res, next", req.body)
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
export default registerValid;