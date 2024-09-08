import express from 'express';
import { getProducts, newProduct, removeProduct, updateProduct } from '../controllers/products.controller.js';

const router = express.Router();

router.get("/", getProducts);

router.post('/', newProduct);

router.delete('/:id', removeProduct);

router.put('/:id', updateProduct);

export default router;