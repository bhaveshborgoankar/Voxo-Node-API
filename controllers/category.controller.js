import { of } from "await-of";
import { Category } from "../models/category.model.js";
import { ReE, ReS } from '../helper/utils.js';
import { modifiedImage } from "../helper/uploadImage.js";
import mongoose from "mongoose";

const categoryController = {

    // Get Category
    index: async (req, res) => {
        try {
            const [category, categoryError] = await of(Category.find({ is_deleted: false }));
            if (categoryError) throw categoryError;
            return ReS(res, 200, { msg: "Get all categories successfully", data: category });
        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Store Category
    store: async (req, res) => {
        try {
            const { name, is_active } = req.body;
            const [user, userError] = await of(Category.findOne({ name: name }));
            if (userError) throw userError;

            if (!user) {
                let image = req.files.image ? modifiedImage(req.files.image) : null;
                const category = await of(Category.create({
                    name: name,
                    image: image,
                    is_active: is_active
                }));
                return ReS(res, 200, { msg: "Category created successfully", data: category});
            } else {
                return ReE(res, 400, { msg: "Category is already exist" });
            }

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        };
    },

    // Edit Category
    edit: async (req, res) => {
        try {

            const { id } = req.params;

            if (!id) {
                return ReE(res, 400, { msg: "Category id is required" });
            }

            const [category, categoryError] = await of(Category.findById({ _id: mongoose.Types.ObjectId(id) }));

            if (categoryError) throw categoryError;

            return ReS(res, 200, { msg: 'Get category successfully', data: category });

        } catch (error) {
            console.log("🚀 ~ file: category.controller.js:60 ~ edit: ~ error", error)
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Update Category
    update: async (req, res) => {

        try {

            const { id } = req.params;
            const { name, is_active } = req.body;
            const image = req?.files?.image;

            if (!id) {
                return ReE(res, 400, { msg: "Category id is required" });
            }
            const imageData = modifiedImage(image)
            const [category, categoryError] = await of(Category.findOne({ _id: id }));

            if (categoryError) throw categoryError;

            var updateCategory = {
                name: name,
                image: imageData ?? category.image,
                is_active: is_active
            };

            const [result, resultError] = await of(Category.findByIdAndUpdate(
                { _id: id },
                { $set: updateCategory },
                { new: true }));

            if (resultError) throw resultError;

            return ReS(res, 200, { msg: "Category updated successfully", data: result });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
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
            return ReE(res, error.code, { msg: error.message });
        }

    },

    // Update Category Status
    status: async (req, res) => {

        try {

            const { id } = req.params;
            const { status } = req.params;

            const [category, categoryError] = await of(Category.findById({ _id: id }));

            if (categoryError) throw categoryError;

            const [statusUpdate, statusUpdateError] = await of(Category.findByIdAndUpdate(
                { _id: id },
                { $set: { is_active: status } },
                { new: true }
            ));

            if (statusUpdateError) throw statusUpdateError;

            if (statusUpdate) return ReS(res, 200, { msg: "Category status is updated" });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

};

export default categoryController;