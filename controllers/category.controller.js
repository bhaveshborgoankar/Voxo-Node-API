import { of } from "await-of";
import { Category } from "../models/category.model.js";
import { ReE, ReS } from '../helper/utils.js';
import { modifiedImage } from "../helper/uploadImage.js";
import mongoose from "mongoose";

const categoryController = {

    // Get Categories
    index: async (req, res) => {
        try {
        const { limit, page, search } = req.query;
        const perPage = parseInt(limit) || 0;
        const currentPage = parseInt(page) || 1;
        const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};
        const filter = {
            ...searchQuery,
            is_deleted: false
        };
        const [categories, categoriesError] = await of(
            Category.find(filter)
            .skip(perPage * (currentPage - 1))
            .limit(perPage > 0 ? perPage : 0)
            .sort({ created_at: 'desc' })
        );
        if (categoriesError) throw categoriesError;
        const count = await Category.countDocuments(filter);
        return ReS(res, 200, {
            msg: 'Get all categories successfully',
            data: categories,
            current_page: currentPage,
            pages: perPage > 0 ? Math.ceil(count / perPage) : 1,
            total: count
        });
        } catch (error) {
        return ReE(res, 400, { msg: error.message });
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
            return ReE(res, 400, { msg: error.message });
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
            return ReE(res, 400, { msg: error.message });
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
            return ReE(res, 400, { msg: error.message });
        }
    },

};

export default categoryController;