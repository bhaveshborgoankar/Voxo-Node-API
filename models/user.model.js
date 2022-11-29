import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

// User schema
var userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: Number },
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean }
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
export default mongoose.model('Users', userSchema)