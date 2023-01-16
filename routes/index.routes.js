import express from 'express';
import AuthRoutes from './auth.routes.js';
import UserRoutes from './user.routes.js';
import CategoryRoutes from './category.routes.js';
import TagRoutes from './tag.routes.js';

const router = express.Router()

// Auth
router.use('/auth', AuthRoutes);

// User
router.use('/user', UserRoutes);

// Category
router.use('/category', CategoryRoutes);

// Tag
router.use('/tag', TagRoutes)


export default router;