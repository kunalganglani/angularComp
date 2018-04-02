const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    contactNumber: Number,
    alternateContactNumber: Number,
    email: String,
    gender: String,
    username: String,
    password: String

});

module.exports = mongoose.model('user', userSchema, 'users');
// here users is the table name in mlab db, user is model name