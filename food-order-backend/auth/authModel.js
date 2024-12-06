const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: Number, 
});

const User = mongoose.model('Auth', userSchema);

module.exports = User;