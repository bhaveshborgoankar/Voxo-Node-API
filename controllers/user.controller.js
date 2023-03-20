import { of } from "await-of";
import { ReE, ReS } from "../helper/utils.js";
import { User } from "../models/user.model.js";

const userController = {

    // Get User
    index: async (req, res) => {
        try {
            const { page, limit, search } = req.query;

            // set default values if page and limit are not provided
            const perPage = parseInt(limit) || 0;
            const currentPage = parseInt(page) || 1;

            const filter = {
                is_deleted: false
            };

            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ];
            }

            const [users, userError] = await of(User.find(filter)
                                                .skip((perPage * currentPage) - perPage)
                                                .limit(perPage)
                                                .sort({ created_at: 'desc' })
                                                .exec());
            if (userError) throw userError;

            const count = await User.countDocuments(filter);
            const totalPages = Math.ceil(count / perPage);

            return ReS(res, 200, {
                msg: 'Get all users successfully',
                data: users,
                success: true,
                pagination: {
                    total: count,
                    per_page: perPage,
                    current_page: currentPage,
                    last_page: totalPages
                }
            });
        } catch (error) {
            return ReE(res, 400, { msg: error.message, success: false });
        }
    },

    // Store User
    store: async (req, res) => {
        try {
            const { name, email, phone, password, street, state, zip } = req.body;

            const user = await of(User.create({
                email: email,
                password: password,
                name: name,
                phone: phone
            }))
            // return ReS(res, 200, "User create successfully", user);
            return ReS(res, 200, { msg: 'User create successfully', data: user, success: true });
        } catch (error) {
            return ReE(res, 400, { msg: error.message, success: false });;
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

            return ReS(res, 200, { msg: 'Get user by Id successfully', data: user, success: true });
        } catch (error) {
            return ReE(res, 400, { msg: error.message, success: false });
        }
    },

    // Update User
    update: async (req, res) => {

        try {

            const { id } = req.params;

            if (!id) {
                return ReE(res, 400, { msg: "id is required" });
            }

            const { name, email, phone } = req.body;

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

            }

            const [result, resultError] = await of(User.findByIdAndUpdate({ _id: id }, { $set: updateUser }, { new: true }));

            if (resultError) throw resultError;
            return ReS(res, 200, { msg: "User update Successfully!", data: result, success: true });

        } catch (error) {
            return ReE(res, 400, { msg: error.message, success: false });
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

            return ReS(res, 200, { msg: "User delete successfully!", success: true });

        } catch (error) {
            return ReE(res, 400, { msg: error.message, success: false });
        }
    },

    // Update User Status
    status: async (req, res) => {

        try {

            const { id } = req.params;
            const { status } = req.params;

            const [user, userError] = await of(User.findById({ _id: id }));
            if (userError) throw userError;

            const [statusUpdate, statusUpdateError] = await of(User.findByIdAndUpdate(
                { _id: id },
                { $set: { is_active: status } },
                { new: true }
            ));
            if (statusUpdateError) throw statusUpdateError;
            return ReS(res, 200, { msg: "User status is updated", success: true });

        } catch (error) {
            return ReE(res, 400, { msg: error.message, success: false });
        }
    },
}

export default userController;