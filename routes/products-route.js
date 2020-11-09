const express = require('express');
const { check } = require('express-validator');

const productsControllers = require('../controllers/products-controllers')

const router = express.Router();

router.get('/:pid', productsControllers.getProductsByID); 

router.post('/', 
[
    check('name').not().isEmpty(),
    check('branch').not().isEmpty(),
    check('OS').not().isEmpty(),
    check('color').not().isEmpty(),
    check('price').not().isEmpty()
],
productsControllers.createProduct
);

router.patch('/:pid', [
    check('name').not().isEmpty(),
    check('color').not().isEmpty(),
    check('price').not().isEmpty()
],
productsControllers.updateProduct
);

router.delete('/:pid', productsControllers.deleteProduct);

module.exports = router;