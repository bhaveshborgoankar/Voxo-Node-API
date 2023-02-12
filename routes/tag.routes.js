import express from 'express'
import { TagController } from '../controllers/tag.controller.js';
import { checkAuthentication } from '../middleware/index.js';
import { TagMiddleware } from '../middleware/tag.middleware.js';

const router = express.Router();

// Get Tags
router.get('/', checkAuthentication, TagController.index);

//  Create Tag
router.post('/create', TagMiddleware.create, TagController.store);

// Edit Tag
router.get('/edit/:id', checkAuthentication, TagController.edit);

// Update Tag
router.put('/update/:id', checkAuthentication, TagController.update);

// Delete Tag
router.delete('/delete/:id', checkAuthentication, TagController.delete);

// Update Tag Status
router.put('/:id/:status', checkAuthentication, TagController.status)

export default router