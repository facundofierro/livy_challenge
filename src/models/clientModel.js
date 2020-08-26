import mongoose from 'mongoose';

/**
 * Client model schema.
 */
const clientSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  role: { type: String },
});

export default mongoose.model('client', clientSchema);
