// Defining Officer model with interaction history
import { Schema, model } from 'mongoose';

const officerSchema = new Schema({
  name: { type: String, required: true, maxlength: 255 },
  contactInfo: {
    phone: { type: String, required: true, maxlength: 20 },
    email: { type: String, maxlength: 255 },
  },
  region: { type: String, required: true, index: true },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  interactionHistory: [{
    callLogId: {
      type: Schema.Types.ObjectId,
      ref: 'CallLog',
    },
    outcome: { type: String, maxlength: 100 },
    timestamp: { type: Date, default: Date.now },
  }],
}, {
  collection: 'officers',
});

officerSchema.index({ 'interactionHistory.timestamp': -1 });

export default model('Officer', officerSchema);