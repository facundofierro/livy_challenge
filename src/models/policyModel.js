import { Schema, model } from 'mongoose';

/**
 * Policy model schema.
 */
const policySchema = new Schema({
  id: { type: String, required: true },
  amountInsured: { type: Number, required: true },
  email: { type: String },
  inceptionDate: { type: Date },
  installmentPayment: { type: Boolean },
  clientId: { type: String },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client',
  },
});

export default model('policy', policySchema);
