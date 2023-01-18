const express = require('express');
const router = express.Router();
const authJwt = require('./verifyJwtToken');
const validateInfo = require('./validate');
const AuthController = require('../controllers/auth.controllers');
const { path } = require('@hapi/joi/lib/errors');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ status: "success", message: "Practical Task API"});
});

/** user sign up */
router.post('/auth/sign_up', [validateInfo.userSignup], AuthController.userSignup);

/** user sign in */
router.post('/auth/sign_in', [validateInfo.userSignin], AuthController.userSignin);

/** add products */
router.post('/auth/add_products', [validateInfo.addProduct], AuthController.addProduct);

/** get products */
router.get('/auth/get_products', AuthController.getProduct);

/** edit product */
router.post('/auth/edit_product', [validateInfo.editProduct], AuthController.editProduct);

/** delete product */
router.post('/auth/delete_product', [validateInfo.deleteProduct], AuthController.deleteProduct);

module.exports = router;