import express from 'express';
import AuthRoutes from './auth.routes.js';
import UserRoutes from './user.routes.js';
import CategoryRoutes from './category.routes.js';

const router = express.Router()

// Auth
router.use('/', AuthRoutes);

// User_management
router.use('/', UserRoutes);

// Category
router.use('/', CategoryRoutes)

export default router;