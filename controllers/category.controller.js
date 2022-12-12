import { of } from "await-of";
import { Category } from "../models/category.modal.js";

const categoryController = {

    // Get Category
    index: async (req, res, next) => {
        try {
            const category = await of(Category.find({}));
            res.status(200).json({ msg: "Successfully", data: category });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },

    // Create Category
    create: async (req, res, next) => {
        try {
            const { name } = req.body;
            console.log("name", name, "image", req)
            // const image = req.file
            // const [user] = await of(Category.findOne({ type: type }));
            // if (!user) {
            //     const category = await of(Category.create({
            //         type: type
            //     }))
            //     res.status(200).json({ msg: "Added Successfully", data: category });
            // } else {
            //     res.status(200).send("Category is already Added")
            //     // res.status(200).json({ msg: 'Category is already Added' });
            // }
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },

    // Edit Category
    edit: async (req, res, next) => {
        try {
            const { id } = req.query;
            const { type } = req.body;
            const [category] = await of(Category.findOne({ _id: id }));
            if (category) {
                var updateCategory = {
                    type: type
                }
                await of(Category.findByIdAndUpdate({ _id: id }, { $set: updateCategory }, { new: true }, function (err, updated_category) {
                    if (err) {
                        res.status(200).json({ msg: err.message });
                    } else {
                        res.status(200).json({ msg: 'Updated Successfully', data: updated_category });
                    }
                }))
            } else {
                res.status(200).send("Id is not matched")
                // res.status(200).json({ msg: 'Id is not matched' });
            }
        } catch (error) {
            res.status(200).json({ msg: error.message });
        }
    },

    // Delete Category
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (id) {
                await of(Category.findByIdAndDelete({ _id: id }, function (err, data) {
                    if (err) {
                        res.status(200).json({ msg: err.message });
                    } else {
                        res.status(200).send("Category delete successfully")
                        // res.status(200).json({ data: "Category delete successfully" });
                    }
                }))
            } else {
                res.status(200).send("Please provide proper Id");
                // res.status(400).json({ msg: "Please provide proper Id" });
            }
        } catch (err) {
            res.status(400).json({ msg: err.message });
        }
    }
}

export default categoryController;