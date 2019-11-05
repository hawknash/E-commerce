const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HistorySchema = new Schema({
    user: String,
    name: String,
    price: Number,
    discount: String,
    imageURL : String 
});

const HistoryChar = mongoose.model('historychar', HistorySchema);
module.exports = HistoryChar;