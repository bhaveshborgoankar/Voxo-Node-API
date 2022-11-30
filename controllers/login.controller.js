const bcrypt = require('bcryptjs');
const { User } = require('../connection/db');
exports.login = async (req, res, next) => {
    try {
        const { email, password, name, phone } = req.body;
        if (!(email && password && name && phone)) {
            res.status(400).send("All input is required");
        }
        const user = User({
            email: email,
            password: password,
            name: name,
            phone: phone
        })
        user.save()
        // const aa = await User.find({ name: 'Testtttt' }, function (err, docs) {
        //     if (err) {
        //         console.log("Errorrr", err)
        //         res.status(404).json({ message: 'Got an Error', err: err })
        //     } else {
        //         console.log("docs", docs)
        //         res.status(200).json({ message: 'It is avaliable', docs: docs })
        //     }
        // })
        // console.log("a", aa)
        res.status(200).json({ message: "Successfully Login", data: user })
    } catch (error) {
        console.log(error)
    }
}
exports.getLoginData = async (req, res, next) => {
    try {
        const aa = await User.findOne({ name: 'dd' }, function (err, docs) {
            if (err) {
                console.log("Errorrr", err)
                res.status(404).json({ message: 'Got an Error', err: err })
            } else {
                console.log("docs", docs)
                res.status(200).json({ message: 'It is avaliable', docs: docs })
            }
        })
        console.log("a", aa)
    } catch (err) {
        console.log('err', err)
        res.status(404).json({ message: 'Got an Error' })
    }
}