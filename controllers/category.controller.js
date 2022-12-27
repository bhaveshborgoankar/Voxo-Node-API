import { of } from "await-of";
import { Category } from "../models/category.modal.js";
import { ReE, ReS } from '../helper/utils.js';
import { modifiedImage } from "../helper/uploadImage.js";

const categoryController = {


    // Get Category
    index: async (req, res) => {

        try {

            const [category, categoryError] = await of(Category.find({ is_deleted: false }));

            if (categoryError) throw categoryError;

            return ReS(res, 200, "Get all categories successfully", category);

        } catch (error) {
            return ReE(res, 400, error.message);
        }
    },

    // Store Category
    store: async (req, res) => {

        try {
            const { name } = req.body;
            const { image } = req.files;
            const [user, userError] = await of(Category.findOne({ name: name }));

            if (userError) throw userError;

            if (!user) {

                const result = modifiedImage(image)

                const category = await of(Category.create({
                    name: name,
                    image: result
                }));

                return ReS(res, 200, "Category created successfully", category);

            } else {
                return ReE(res, 400, { msg: "Category is already exist" });
            }

        } catch (error) {
            ReE(res, 400, { msg: error.message });
        };
    },

    // Edit Category
    edit: async (req, res) => {

        try {

            const { id } = req.params;

            if (!id) {
                return ReE(res, 400, { msg: "Category id is required" });
            }

            const [category, categoryError] = await of(Category.findById({ _id: id }));

            if (categoryError) throw categoryError;

            return ReS(res, 200, { msg: 'Get category by Id successfully', data: category });

        } catch (error) {
            return ReE(res, 404, { msg: error.message });
        }
    },

    // Update Category
    update: async (req, res) => {

        try {

            const { id } = req.params;
            const { name } = req.body;
            const image = req?.files?.image;

            if (!id) {
                return ReE(res, 400, { msg: "Category id is required" });
            }
            const imageData = modifiedImage(image)
            const [category, categoryError] = await of(Category.findOne({ _id: id }));

            if (categoryError) throw categoryError;

            var updateCategory = {
                name: name,
                image: imageData ?? category.image
            };

            const [result, resultError] = await of(Category.findByIdAndUpdate(
                { _id: id },
                { $set: updateCategory },
                { new: true }));

            if (resultError) throw resultError;

            return ReS(res, 200, "Category updated successfully", result);

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        };
    },

    // Delete Category
    delete: async (req, res) => {

        try {

            const { id } = req.params;

            if (!id) {
                return ReE(res, 400, { msg: "Category id is required" });
            }

            const [result, resultError] = await of(Category.findByIdAndUpdate(
                { _id: id },
                { $set: { is_deleted: true } },
                { new: true })
            );

            if (resultError) throw resultError

            return ReS(res, 200, { msg: "Category delete successfully" });

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        }

    }

};

export default categoryController;