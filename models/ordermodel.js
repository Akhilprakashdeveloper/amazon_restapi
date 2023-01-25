const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema(
    {
    id:Number,
    product_name:String,
    cost:Number,
    name:String,
    email:String,
    phone:Number,
    address:String,
    transaction:String,
    bank:String,
    date:String
    })
    

const Order=mongoose.model('order',orderSchema);
module.exports=Order;