import mongoose from "mongoose";
import slugify from "slugify";

var pageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
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

// Middleware to create slug before saving
pageSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    return next();
  }
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Page = mongoose.model('pages', pageSchema);
export { Page };
