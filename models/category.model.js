import mongoose from "mongoose";

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
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

const Category = mongoose.model('categories', categorySchema);
export { Category };