// Defining Client model with interaction history
import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
  name: { type: String,
    required: true,
    maxlength: 255 },
  contactInfo: {
    phone: { type: String, required: true, maxlength: 20 },
    email: { type: String, maxlength: 255 },
  },
  region: { type: String, required: true,
    index: true, // Optimize region-based queries
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'prospective'],
    default: 'active',
  },
  interactionHistory: [{
    callLogId: {
      type: Schema.Types.ObjectId,
      ref: 'CallLog',
    },
    note: { type: String, maxlength: 500 },
    outcome: { type: String, maxlength: 100 },
    timestamp: { type: Date, default: Date.now },
  }],
}, {
  collection: 'clients',
});

clientSchema.index({ 'interactionHistory.timestamp': -1 });

export default model('Client', clientSchema);