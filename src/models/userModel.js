import { Schema, model } from 'mongoose';


/**
 * Product model schema.
 */
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = model('product', userSchema);
