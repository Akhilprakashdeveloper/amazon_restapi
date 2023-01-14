
const mongoose=require('mongoose');

const amazondataSchema=new mongoose.Schema(
    {
    _id: { type: String, required: true },
    id: { type: Number, required: true },
    product_name: { type: String, required: true },
    category: { type: String, required: true },
    category_id: { type: Number, required: true },
    ram: { type: Number },
    storage: { type: Number },
    price: { type: Number },
    colour: { type: String },
    brand: { type: String },
    image: { type: String },
    processor: { type: String },
    author:{type:String},
    book_name:{type:String},
    },
    {
        collection: 'amazondata'
    })
    

const AmazonData=mongoose.model('amazondata',amazondataSchema);
module.exports=AmazonData;