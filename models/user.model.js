const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema
var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
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
        console.log("hashed", hashed);
        return next();
    } catch (err) {
        return next(err);
    }
});
module.exports = mongoose.model('User', userSchema);