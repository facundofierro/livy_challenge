const mongoose = require('mongoose');

/**
 * Product model schema.
 */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String},
    password: { type: String, required: true },
    role: {type: String, required: true }
});

module.exports = mongoose.model('product', userSchema);