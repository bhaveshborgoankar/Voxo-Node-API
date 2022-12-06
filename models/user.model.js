import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

// User schema
var userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    confirm_password: { type: String },
    phone: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean },
    random_string: { type: String },
    token: { type: String }
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
        console.log("hashed", hashed);
        return next();
    } catch (err) {
        console.log("Modal ERRRRRRR")
        return next(err);
    }
});

const UserModal = mongoose.model('User', userSchema);
export { UserModal }