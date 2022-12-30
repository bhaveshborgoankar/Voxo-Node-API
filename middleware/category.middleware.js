import { ResponseValidator } from "../helper/ResponseValidator.js";

export const CategoryMiddleware = {

    create: async (req, res, next) => {
        const createRules = {
            "name": "required|string",
        };

        return ResponseValidator(req, createRules, res, next);
    },

    edit: async (req, res, next) => {

        // Need to ask prajit sir what kind of validation we need to add for this API

        // const getByIDRule = {
        //     "id": "required|string",
        // };

        // return ResponseValidator(req, getByIDRule, res, next);
        next();
    },

    update: async (req, res, next) => {
        const updateRules = {
            "name": "required|string",
        };

        return ResponseValidator(req, updateRules, res, next);
    },

    status: async (req, res, next) => {
        // Need to ask prajit sir what kind of validation we need to add for this API
        // const statusRules = {
        //     "id": "required|string",
        //     "status": "required|boolen",
        // };

        // return ResponseValidator(req, statusRules, res, next);
        next();
    },

}