import { of } from "await-of";
import { User } from "../connection/db.js";

const userController = {

    // Get User
    index: async (req, res, next) => {
        try {
            const users = await of(User.find({}));
            res.status(200).json({ data: users });
        } catch (error) {
            console.log("Error", error);
            res.status(400).json({ message: error.message });
        }
    },

    // Create User
    create: async (req, res, next) => {
        try {
            const { name, email, phone, password, confirm_password, country } = req.body;
            const image = req.file.filename;
            if (!name || !email || !phone || !password || !confirm_password || !country) {
                res.status(404).json({ message: "All fields are required" });
            } else {
                if (password !== confirm_password) res.status(404).send({ message: "Password not match" });
                else {
                    const user = await of(User.create({
                        email: email,
                        password: password,
                        name: name,
                        phone: phone,
                        country: country,
                        image: image,
                        // if sir will say to add then i will add the below line
                        // token: getToken(email)
                    }))
                    res.status(200).json({ message: "Successfully Register", data: user });
                }
            }
        }
        catch (error) {
            res.status(400).json({ msg: error.message });
        };
    },

    // Edit User
    edit: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, email, phone, is_active } = req.body;
            await of(User.findOne({ _id: id }, function (err, data) {
                if (err) {
                    res.status(400).json({ message: err.message, data: "User is not exist" });
                } else {
                    var updateUser = {
                        update_on: new Date(),
                        is_deleted: false,
                    };
                    if (name) {
                        updateUser.name = name
                    };
                    if (email) {
                        updateUser.email = email
                    };
                    if (phone) {
                        updateUser.phone = phone
                    };
                    if (is_active) {
                        updateUser.is_active = is_active
                    };
                    User.findByIdAndUpdate({ _id: id }, { $set: updateUser }, { new: true }, function (err, result) {
                        if (err) {
                            res.status(400).json({ message: "Name is Required" });
                        } else {
                            res.status(200).json({ message: 'result', data: result });
                        }
                    });
                }
            }));
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete User
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (id) {
                User.findByIdAndDelete({ _id: id }, function (err, data) {
                    if (err) {
                        res.status(400).json({ message: "Please provide valid id" });
                    } else {
                        res.status(200).json({ message: 'User delete successfully' });
                    }
                });
            } else {
                res.status(400).json({ message: 'Please provide ID' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default userController;