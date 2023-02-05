import mongoose from "mongoose";

var attributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    values: {
        type: Array
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Attribute = mongoose.model('attribute', attributeSchema);
export { Attribute };