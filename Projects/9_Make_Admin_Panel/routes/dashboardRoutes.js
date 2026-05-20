import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { dashboardPage } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', protect, dashboardPage);

export default router;