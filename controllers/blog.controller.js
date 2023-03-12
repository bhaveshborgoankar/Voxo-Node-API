import { of } from "await-of";
import { Blog } from "../models/blog.modal.js";
import { ReE, ReS } from '../helper/utils.js';

const blogController = {

    // Get Blogs
    index: async (req, res) => {
        try {
            const perPage = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const search = req.query.search;

            let filter = { is_deleted: false };
            if (search) {
                filter["$or"] = [
                    { title: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } }
                ];
            }

            const blogs = await Blog.find(filter)
                                .skip((perPage * page) - perPage)
                                .limit(perPage)
                                .sort({created_at: 'desc'})
                                .exec();
            const count = await Blog.countDocuments(filter);
            
            return ReS(res, 200, { 
                data: blogs,
                current_page: page,
                pages: Math.ceil(count / perPage),
                total: count
            });
        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },



    // Store Blog
    store: async (req, res) => {
        try {
            const { name, description, content, categories, tags } = req.body;

            const blog = new Blog({
                name: name,
                description: description,
                content: content,
                categories: categories,
                tags: tags
            });

            const [savedBlog, error] = await of(blog.save());
            if (error) throw error;

            return ReS(res, 201, { msg: "Blog created successfully", data: savedBlog });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        };
    },

    // Edit Blog
    edit: async (req, res) => {
        try {
            const { blog_id } = req.params;

            const [blog, error] = await of(Blog.findById(blog_id));
            if (error) throw error;

            return ReS(res, 200, { data: blog });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Update Blog
    update: async (req, res) => {
        try {
            const { blog_id } = req.params;
            const { name, description, content, categories, tags } = req.body;

            const [updateResult, error] = await of(Blog.updateOne(
                { _id: blog_id },
                {
                    $set: {
                        name: name,
                        description: description,
                        content: content,
                        categories: categories,
                        tags: tags
                    }
                }
            ));
            if (error) throw error;

            return ReS(res, 200, { msg: "Blog updated successfully" });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        };
    },

    // Delete Blog
    delete: async (req, res) => {
        try {
            const { blog_id } = req.params;

            const [updateResult, error] = await of(Blog.updateOne(
                { _id: blog_id },
                { $set: { is_deleted: true } }
            ));
            if (error) throw error;

            return ReS(res, 200, { msg: "Blog deleted successfully" });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }

    },

};

export default blogController;
