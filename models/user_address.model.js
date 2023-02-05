import mongoose from 'mongoose';

// User Address schema
var userAddressSchema = new mongoose.Schema({
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    landmark: {
        type: String
    },
    pincode: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    is_shipping: {
        type: Boolean,
        default: false
    },
    is_billing: {
        type: Boolean,
        default: false
    },
    is_default: {
        type: Boolean,
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const UserAddress = mongoose.model('user_addresses', userAddressSchema);
export { UserAddress }