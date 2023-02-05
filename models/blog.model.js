import mongoose from "mongoose";

var blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    categories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'categories'
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'tags'
    },
    status: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Blog = mongoose.model('blogs', blogSchema);
export { Blog };