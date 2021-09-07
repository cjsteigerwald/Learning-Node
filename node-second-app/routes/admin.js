const express = require('express');
const path = require('path');
const adminController = require('../controllers/admin');
const router = express.Router();

// /admin/add-product
router.get('/add-product', adminController.getAddProduct);

// /admin/products
router.get('/products', adminController.getProducts);

// /admin/add-product
router.post('/add-product', adminController.postAddProduct);

exports.routes = router;
