import mongoose from 'mongoose';

/**
 * Policy model schema.
 */
const policySchema = new mongoose.Schema({
  id: { type: String, required: true },
  amountInsured: { type: Number, required: true },
  email: { type: String },
  inceptionDate: { type: Date },
  installmentPayment: { type: Boolean },
  clientId: { type: String },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
  },
});

export default mongoose.model('policy', policySchema);
