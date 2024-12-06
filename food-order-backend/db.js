const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/food_ordering');
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

module.exports = connectToDatabase;
