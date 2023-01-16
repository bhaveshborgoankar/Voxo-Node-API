import { of } from "await-of";
import { Blog } from "../models/blog.modal.js";
import { ReE, ReS } from '../helper/utils.js';

const categoryController = {

    // Get Blogs
    index: async (req, res) => {
        try {

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Store Blog
    store: async (req, res) => {
        try {

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        };
    },

    // Edit Blog
    edit: async (req, res) => {
        try {

            
        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Update Blog
    update: async (req, res) => {
        try {

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        };
    },

    // Delete Blog
    delete: async (req, res) => {
        try {

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }

    },

};

export default categoryController;