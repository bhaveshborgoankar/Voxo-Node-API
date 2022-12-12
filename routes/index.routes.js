import express from 'express';
import AuthRoutes from './auth.routes.js';
import UserRoutes from './user.routes.js';
import CategoryRoutes from './category.routes.js';

const router = express.Router()

// Auth
router.use('/auth', AuthRoutes);

// User_management
router.use('/user', UserRoutes);

// Category
router.use('/category', CategoryRoutes)

export default router;