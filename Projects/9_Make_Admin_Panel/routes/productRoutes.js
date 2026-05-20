import express from 'express';
import {
  getProducts,
  createProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/create', createProduct);
router.get('/delete/:id', deleteProduct);

export default router;