import mongoose from "mongoose";

var blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

const Category = mongoose.model('blogs', blogSchema);
export { Category };