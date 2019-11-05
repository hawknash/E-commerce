const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RecordsSchema = new Schema({
    user: String,
    Name: String,
    Age: Number,
    Address: String,
    Diseases: String,
    RecordDate: Date,
    Description: String,
    Contact: String 
});

const RecordsChar = mongoose.model('recordschar', RecordsSchema);
module.exports = RecordsChar;