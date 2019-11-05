const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GeneralSchema = new Schema({
    name: String,
    price: Number,
    discount: String,
    imageURL : String 
});

const GeneralChar = mongoose.model('generalchar', GeneralSchema);
module.exports = GeneralChar;