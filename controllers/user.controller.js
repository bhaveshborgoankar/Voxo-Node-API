import { of } from "await-of";
import { ReE, ReS } from "../helper/utils.js";
import { User } from "../models/user.model.js";

const userController = {

    // Get User
    index: async (req, res, next) => {

        try {

            const [users, error] = await of(User.find({}));

            if (users) {
                return ReS(res, 200, 'Success', users)
            } else {
                return ReE(res, 404, error.message)
            }

        } catch (error) {
            console.log("Error", error);
            return ReE(res, 400, { msg: error.message })
        }
    },

    // Create User
    create: async (req, res, next) => {

        try {

            const { name, email, phone, password, confirm_password, country } = req.body;
            const image = req.file.filename;

            const user = await of(User.create({
                email: email,
                password: password,
                name: name,
                phone: phone,
                country: country,
                image: image,
            }))
            return ReS(res, 200, "Successfully Register", user);
        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        };
    },

    single: async (req, res, next) => {

        try {

            const { id } = req.params;
            const [user, err] = await of(User.findById({ _id: id }))

            if (err) {
                return ReE(res, 400, { msg: 'Id is not match with our Database' })
            } else {
                return ReS(res, 200, { msg: 'user', data: user })
            }

        } catch (error) {
            return ReE(res, 404, { msg: error.message })
        }
    },

    // Edit User
    edit: async (req, res, next) => {

        try {

            const { id } = req.params;
            const { name, email, phone, is_active } = req.body;
            const [user, error] = await of(User.find({ _id: id }));

            if (error) {
                return ReE(res, 400, { msg: error.message })
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

                const [result, error] = await of(User.findByIdAndUpdate({ _id: id }, { $set: updateUser }, { new: true }));

                if (!error) {
                    return ReS(res, 200, "Successfully updated!", result);
                }
            }
        } catch (error) {
            return ReS(res, 400, { msg: error.message });
        }
    },

    // Delete User
    delete: async (req, res, next) => {

        try {

            const { id } = req.params;
            const updateInformation = {
                is_deleted: true
            };

            if (id) {

                const [result, error] = await of(User.updateOne({ _id: id }, { $set: updateInformation }));

                if (error) {
                    return ReE(res, 400, { msg: error.message });
                } else {
                    return ReS(res, 200, "Successfully deleted!");
                }

            } else {
                return ReE(res, 400, { msg: "Please provide valid ID" });
            }

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        }
    }
}

export default userController;