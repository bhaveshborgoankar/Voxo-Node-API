import Validator from 'validatorjs';


const validator = async (body, rules, customMessages, callback) => {
    console.log("🚀 ~ file: validator.js:5 ~ validator ~ body, rules, customMessages, callback", body, rules, customMessages, callback)

    // const validation = new Validator(body, rules, customMessages);
    // validation.passes(() => callback(null, true));
    // validation.fails(() => callback(validation.errors, false));
    console.log("gdfjhsdgfjhysdgf");
    Validator.registerAsync('exist', function (value, attribute, req, passes) {
        console.log("🚀 ~ file: validator.js:11 ~ value, attribute, req,", value, attribute, req)

    });

};


// const validator = async (body, rules, customMessages, callback) => {
//     const validation = new Validator(body, rules, customMessages);
//     validation.passes(() => callback(null, true));
//     validation.fails(() => callback(validation.errors, false));
// };



export default validator;