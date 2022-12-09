import mongoose from "mongoose";

var categorySchema = new mongoose.Schema({
    type: { type: String, required: true }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const CategoryModal = mongoose.model('Category', categorySchema);
export { CategoryModal };