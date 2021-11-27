const path = require('path');

const express = require('express');

const { check, body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  '/add-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    // body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct,
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title', 'Invalid Title').isString().isLength({ min: 3 }).trim(),
    // body('imageUrl', 'Invalid Image URL').isURL(),
    body('price', 'Invalid Price').isFloat(),
    body('description', 'Invalid Description').isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct,
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
