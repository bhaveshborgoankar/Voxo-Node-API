import express from "express";
import pageController from "../controllers/page.controller.js";
import { checkAuthentication } from '../middleware/index.js';

const router = express.Router();

// Get Pgaes
router.get('/', checkAuthentication, pageController.index);

// Create Page
router.post('/create', checkAuthentication, pageController.store);

// Edit Page
router.get('/:id', checkAuthentication, pageController.edit);

// Update Page
router.put('/edit/:id', checkAuthentication, pageController.update);

// Delete Page
router.delete('/delete/:id', checkAuthentication, pageController.delete);

export default router;