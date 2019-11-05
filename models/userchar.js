const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    pass: String
});

const UserChar = mongoose.model('userchar', UserSchema);
module.exports = UserChar;