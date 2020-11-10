const express = require('express');
const { check } = require('express-validator');

const productsControllers = require('../controllers/products-controllers')

const router = express.Router();

router.get('/:pid', productsControllers.getProductsByID); 

router.post('/', 
[
    check('name').not().isEmpty(),
    check('author').not().isEmpty(),
    check('category').not().isEmpty(),
    check('country').not().isEmpty(),
    check('price').not().isEmpty()
],
productsControllers.createProduct
);

router.patch('/:pid', [
    check('name').not().isEmpty(),
    check('category').not().isEmpty(),
    check('price').not().isEmpty()
],
productsControllers.updateProduct
);

router.delete('/:pid', productsControllers.deleteProduct);

module.exports = router;