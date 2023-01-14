const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: { type: String },
    id: { type: Number },
    category_id: { type: Number },
    category: { type: String },
    imgurl: { type: String},
},{
    collection: 'category'
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
