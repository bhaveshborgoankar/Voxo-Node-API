import { ResponseValidator } from "../helper/ResponseValidator.js";

export const TagMiddleware = {

    create: async (req, res, next) => {

        const createRules = {
            "name": "required|string",
            "type": "required|string",
            "is_active": "required|boolean"
        };

        return ResponseValidator(req, createRules, res, next);
    }
}