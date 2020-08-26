import mongoose from 'mongoose';


/**
 * Product model schema.
 */
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export default mongoose.model('user', userSchema);
