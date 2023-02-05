import mongoose from "mongoose";

var settingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    values: {
        type: Object
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Setting = mongoose.model('settings', settingSchema);
export { Setting };