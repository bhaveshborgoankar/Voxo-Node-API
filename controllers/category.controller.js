import { of } from "await-of";
import { Category } from "../models/category.modal.js";
import { ReE, ReS } from '../helper/utils.js';

const categoryController = {

    // Get Category
    index: async (req, res, next) => {

        try {
            const [category] = await of(Category.find({}));
            return ReS(res, 200, "Successfully", category);

        } catch (error) {
            return ReE(res, 400, error.message);
        }
    },

    // Create Category
    create: async (req, res, next) => {

        try {

            const { name } = req.body;
            const [user] = await of(Category.findOne({ name: name }));

            if (user === null) {

                const category = await of(Category.create({
                    name: name
                }));
                return ReS(res, 200, "Successfully added", category);

            } else {
                return ReE(res, 400, { msg: "Category is already Added" });
            };

        } catch (error) {
            ReE(res, 400, { msg: error.message });
        };
    },

    // Edit Category
    edit: async (req, res, next) => {

        try {

            const { id } = req.params;
            const { name } = req.body;
            const [category] = await of(Category.findOne({ _id: id }));

            if (category) {

                var updateCategory = {
                    name: name
                };
                const [update, error] = await of(Category.findByIdAndUpdate({ _id: id }, { $set: updateCategory }, { new: true }));

                if (error) {
                    return ReE(res, 400, { msg: error.message });
                } else {
                    return ReS(res, 200, "Successfully update", update);
                }

            } else {
                return ReE(res, 400, { msg: "Id is not matched" });
            };

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        };
    },

    // Delete Category
    delete: async (req, res, next) => {

        try {

            const { id } = req.params;

            if (id) {
                const updateInformation = {
                    is_deleted: true
                };
                const [result, error] = await of(User.updateOne({ _id: id }, { $set: updateInformation }));

                if (error) {
                    return ReE(res, 400, { msg: error.message });
                } else {
                    return ReS(res, 200, { msg: "Category delete successfully" });
                };

            } else {
                return ReE(res, 200, { msg: "Please provide proper Id" });
            };

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        };
    }
};

export default categoryController;