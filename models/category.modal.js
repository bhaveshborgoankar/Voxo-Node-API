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
        type: Boolean
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Category = mongoose.model('Category', categorySchema);
export { Category };