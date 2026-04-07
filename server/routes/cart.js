import express from 'express';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:itemId', protect, updateCartItem);
router.delete('/:itemId', protect, removeFromCart);

export default router;
