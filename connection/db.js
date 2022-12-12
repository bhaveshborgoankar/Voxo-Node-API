import mongoose from 'mongoose';

/* connect to MongoDB */
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/voxoAPI');
    console.log('MongoDb Connected');
}