import mongoose from 'mongoose'
import { CategoryModal } from '../models/category.modal.js';
import { UserModal } from '../models/user.model.js';

const url = "mongodb://localhost:27017/voxoAPI";

/* connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("database connected");
} catch (error) {
    console.log(error);
}

const User = UserModal;
const Category = CategoryModal

export { User, Category }