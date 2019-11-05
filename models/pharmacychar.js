const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PharmacySchema = new Schema({
    name: String,
    price: Number,
    discount: String,
    imageURL : String 
});

const PharmacyChar = mongoose.model('pharmacychar', PharmacySchema);
module.exports = PharmacyChar;