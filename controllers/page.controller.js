import { of } from "await-of";
import { Page } from "../models/Page.modal.js";
import { ReE, ReS } from '../helper/utils.js';

const categoryController = {

    // Get Pages
    index: async (req, res) => {
        try {

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Store Page
    store: async (req, res) => {
        try {

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        };
    },

    // Edit Page
    edit: async (req, res) => {
        try {

            
        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Update Page
    update: async (req, res) => {
        try {

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        };
    },

    // Delete Page
    delete: async (req, res) => {
        try {

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }

    },

};

export default categoryController;