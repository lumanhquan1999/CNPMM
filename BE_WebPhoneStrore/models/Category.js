const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String
    },
    name_en: {
        type: String
    },
    pathseo: {
        type: String
    },
    pathseo_en: {
        type: String
    }

})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category