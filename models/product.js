const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: { type: String, require: true },
    branch: { type: String, require: true },
    image: { type: String, require: true },
    OS: { type: String, require: true },
    color: { type: String, require: true },
    price: { type: Number, require: true }
});

module.exports = mongoose.model('Product', productSchema);