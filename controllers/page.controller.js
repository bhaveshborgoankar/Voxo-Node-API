import { of } from "await-of";
import { Page } from "../models/Page.modal.js";
import { ReE, ReS } from '../helper/utils.js';

const pageController = {

    // Get Pages
    index: async (req, res) => {
        try {
            const perPage = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const search = req.query.search;

            let filter = { is_deleted: false };
            if (search) {
                filter["$or"] = [
                    { name: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } }
                ];
            }

            const pages = await Page.find(filter)
                                .skip((perPage * page) - perPage)
                                .limit(perPage)
                                .sort({created_at: 'desc'})
                                .exec();
            const count = await Page.countDocuments(filter);
            
            return ReS(res, 200, { 
                data: pages,
                current_page: page,
                pages: Math.ceil(count / perPage),
                total: count
            });
        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },


    // Store Page
    store: async (req, res) => {
        try {
            const { name, content } = req.body;

            const page = new Page({
                name: name,
                content: content
            });

            const [savedPage, error] = await of(page.save());
            if (error) throw error;

            return ReS(res, 201, { msg: "Page created successfully", data: savedPage });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        };
    },

    // Edit Page
    edit: async (req, res) => {
        try {
            const { page_id } = req.params;

            const [page, error] = await of(Page.findById(page_id));
            if (error) throw error;

            return ReS(res, 200, { data: page });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Update Page
    update: async (req, res) => {
        try {
            const { page_id } = req.params;
            const { name, content } = req.body;

            const [updateResult, error] = await of(Page.updateOne(
                { _id: page_id },
                {
                    $set: {
                        name: name,
                        content: content
                    }
                }
            ));
            if (error) throw error;

            return ReS(res, 200, { msg: "Page updated successfully" });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        };
    },

    // Delete Page
    delete: async (req, res) => {
        try {
            const { page_id } = req.params;

            const [updateResult, error] = await of(Page.updateOne(
                { _id: page_id },
                { $set: { is_deleted: true } }
            ));
            if (error) throw error;

            return ReS(res, 200, { msg: "Page deleted successfully" });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }

    },

};

export default pageController;
