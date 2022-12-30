import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User schema
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    token: {
        type: Number
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hashSync(this.password, 8);
        this.password = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('User', userSchema);
export { User }