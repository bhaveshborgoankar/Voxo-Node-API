import { of } from "await-of";
import { ReE, ReS } from "../helper/utils.js";
import { User } from "../models/user.model.js";

const userController = {

    // Get User
    index: async (req, res) => {

        try {

            const [users, userError] = await of(User.find({ is_deleted: false }));

            if (userError) throw userError;

            return ReS(res, 200, 'Get all users successfully', users);

        } catch (error) {
            return ReE(res, 400, { msg: error.message })
        }
    },

    // Store User
    store: async (req, res) => {

        try {

            const { name, email, phone, password } = req.body;

            const user = await of(User.create({
                email: email,
                password: password,
                name: name,
                phone: phone
            }))
            return ReS(res, 200, "User create successfully", user);

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        };
    },

    // Edit User
    edit: async (req, res) => {

        try {

            const { id } = req.params;

            if (!id) {
                return ReE(res, 400, { msg: "User id is required" });
            }

            const [user, userError] = await of(User.findById({ _id: id }));

            if (userError) throw userError;

            return ReS(res, 200, { msg: 'Get user by Id successfully', data: user });

        } catch (error) {
            return ReE(res, 404, { msg: error.message });
        }
    },

    // Update User
    update: async (req, res) => {

        try {

            const { id } = req.params;

            if (!id) {
                return ReE(res, 400, { msg: "User id is required" });
            }

            const { name, email, phone, is_active } = req.body;
            const [user, userError] = await of(User.find({ _id: id }));

            if (userError) throw userError;

            if (user) {

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
            }

            const [result, resultError] = await of(User.findByIdAndUpdate({ _id: id }, { $set: updateUser }, { new: true }));

            if (resultError) throw resultError;

            if (result) {
                return ReS(res, 200, "User update Successfully!", result);
            }

        } catch (error) {
            return ReS(res, 400, { msg: error.message, });
        }
    },

    // Delete User
    delete: async (req, res) => {

        try {

            const { id } = req.params;

            if (!id) {
                return ReE(res, 400, { msg: "User id is required" });
            }

            const [result, resultError] = await of(User.updateOne({ _id: id }, { $set: { is_deleted: true } }));

            if (resultError) throw resultError;

            if (result) {
                return ReS(res, 200, { msg: "User delete successfully!" });
            }

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        }
    }
}

export default userController;