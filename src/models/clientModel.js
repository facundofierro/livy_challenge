const mongoose = require('mongoose');

/**
 * Client model schema.
 */
const clientSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    role: { type: String }
});

module.exports = mongoose.model('client', clientSchema);