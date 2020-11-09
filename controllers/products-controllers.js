const { v4: uuid} = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Product = require('../models/product');

let Test_products = [
    {
        id: 'p1',
        branch: 'Apple',
        name: 'Iphone X',
        OS: 'IOS',
        color: 'White',
        price: 1000
    }
];

const getProductsByID =  async (req, res, next) => {
    const productID = req.params.pid;

    let product;
    try {
        product = await Product.findById(productID);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a product.', 500);
        return next(error);
    }
    
    if (!product) {
        const error = new HttpError('Could not find a product for the provided id.', 404);        
        return next(error);
    }

    res.json({product: product.toObject({ getters: true }) });
};

const createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { branch, name, OS, color, price } = req.body;
    const createdProduct = new Product({
        name,
        branch,
        image: 'https://www.google.com/search?q=the+song+of+ice+and+fire&sxsrf=ALeKk00CNfn24LL_h6N8_olDOBhO3eoxSw:1604850773344&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjatIyCp_PsAhXVA4gKHW6tCo4Q_AUoAXoECCUQAw&biw=1366&bih=625#imgrc=yBnllwouTvZoVM',
        OS,
        color,
        price
    });

    try {
        await createdProduct.save();
    } catch (err) {
        const error = new HttpError("Creating product failed, please try again.", 500);
        return next(error);
    }
    


    res.status(201).json({Test_products: createdProduct});
};

const updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const { name, color, price} = req.body;
    const productID = req.params.pid;

    let product;
    try {
        product = await Product.findById(productID);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update product.', 500);
        return next(error);
    }

    product.name = name;
    product.color = color;
    product.price = price;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update product.', 500);
        return next(error);
    }
    res.status(200).json( { product: product.toObject({ getters: true }) });
};

const deleteProduct = (req, res, next) => {
    const productID = req.params.pid;
    if (!Test_products.find(p => p.id === productID)) {
        throw new HttpError('Could not find a product for that id.', 404);
    }
    Test_products = Test_products.filter(p => p.id !== productID);
    res.status(200).json({message: 'Deleted product.'});
};

exports.getProductsByID = getProductsByID;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
