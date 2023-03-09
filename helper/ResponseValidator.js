import validator from '../helper/validator.js';

export const ResponseValidator = async (req, rules, res, next) => {

    await validator(req.body, rules, {}, (err, status) => {
        console.log("errerr", err.first("password"));
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    error: err.errors
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}