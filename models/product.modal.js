import mongoose from "mongoose";

var productSchema = new mongoose.Schema({
    type: { type: String, required: true },
});

const ProductModal = mongoose.model('Product', productSchema);