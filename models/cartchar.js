const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CartSchema = new Schema({
    user: String,
    name: String,
    price: Number,
    discount: String,
    imageURL : String 
});

const CartChar = mongoose.model('cartchar', CartSchema);
module.exports = CartChar;