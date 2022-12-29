import { of } from "await-of"
import { ReE, ReS } from "../helper/utils.js"
import { Tag } from "../models/tag.modal.js"

export const TagController = {

    // Get Tags
    index: async (req, res) => {

        try {

            const { type } = req.query

            const searchType = {
                is_deleted: false,
                type: type
            };

            const [tags, tagsError] = await of(Tag.find(type ? searchType : { is_deleted: false }));

            if (tagsError) throw tagsError;

            return ReS(res, 200, "Get all tags successfully", tags);

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        }
    },

    // Store Tags
    store: async (req, res) => {

        try {

            const { name, type, is_active } = req.body;

            if (!name) {
                return ReE(res, 400, { msg: "Tag name is required" });
            };

            const [isTagExist, isTagExistError] = await of(Tag.findOne({ name: name, type: type }));

            if (isTagExistError) throw isTagExistError;

            if (!isTagExist) {

                const tag = await of(Tag.create({
                    name: name,
                    type: type,
                    is_active: is_active
                }));

                return ReS(res, 200, { msg: "Tag created successfully", data: tag });

            } else {
                return ReE(res, 400, { msg: "Tag is already exist" });
            }

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        }
    },

    // Edit Tag
    edit: async (req, res) => {

        try {

            const { id } = req.params;

            if (!id) {
                return ReE(res, 400, { msg: "Tag id is required" });
            }

            const [tag, tagError] = await of(Tag.findById({ _id: id }));

            if (tagError) throw tagError;

            return ReS(res, 200, { msg: 'Get tag by Id successfully', data: tag });

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        }
    },

    // Update Tag
    update: async (req, res) => {

        try {

            const { id } = req.params;
            const { name, type, is_active } = req.body;

            if (!id) {
                return ReE(res, 400, { msg: "Tag id is required" });
            };

            const updatedTag = {
                name: name,
                type: type,
                is_active: is_active
            }

            const [result, resultError] = await of(Tag.findByIdAndUpdate(
                { _id: id },
                { $set: updatedTag },
                { new: true }));

            if (resultError) throw resultError;

            return ReS(res, 200, "Tag updated successfully", result);

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        };
    },

    // Delete Tag
    delete: async (req, res) => {

        try {

            const { id } = req.params;

            if (!id) {
                return ReE(res, 400, { msg: "Tag id is required" });
            }

            const [result, resultError] = await of(Tag.findByIdAndUpdate(
                { _id: id },
                { $set: { is_deleted: true } },
                { new: true })
            );

            if (resultError) throw resultError

            return ReS(res, 200, { msg: "Tag delete successfully" });

        } catch (error) {
            return ReE(res, 400, { msg: error.message });
        }

    },

    // Update Category Status
    status: async (req, res) => {

        try {

            const { id } = req.params;
            const { status } = req.params;

            const [tag, TagError] = await of(Tag.findById({ _id: id }));

            if (TagError) throw TagError;

            const [statusUpdate, statusUpdateError] = await of(Tag.findByIdAndUpdate(
                { _id: id },
                { $set: { is_active: status } },
                { new: true }
            ));

            if (statusUpdateError) throw statusUpdateError;

            if (statusUpdate) return ReS(res, 200, { msg: "Tag status is updated" });

        } catch (error) {
            return ReE(res, 404, { msg: error.message });
        }
    },
};