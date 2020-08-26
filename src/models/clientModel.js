import { Schema, model } from 'mongoose';

/**
 * Client model schema.
 */
const clientSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  role: { type: String },
});

module.exports = model('client', clientSchema);
