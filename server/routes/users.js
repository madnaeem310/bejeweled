import express from 'express';
import { getAllUsers, getUserById, getDashboardStats } from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard/stats', protect, admin, getDashboardStats);
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);

export default router;
