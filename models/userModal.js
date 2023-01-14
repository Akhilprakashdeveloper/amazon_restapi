const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    role:String
},{
    collection: 'users'
})

const Users= mongoose.model('Users', userSchema);

module.exports = Users;