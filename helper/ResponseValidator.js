import validator from '../helper/validator.js';

export const ResponseValidator = async (req, rules, res, next) => {

    await validator(req.body, rules, {}, (err, status) => {
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