// src/models/CallLog.js
import { Schema, model } from 'mongoose';

const callLogSchema = new Schema(
  {
    officerId: {
      type: Schema.Types.ObjectId,
      ref: 'Officer', // Corrected from refId
      required: true,
      index: true, // Optimize officer-based queries
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client', // Corrected from refId
      required: true,
      index: true, // Optimize client-based queries
    },
    duration: { type: Number, required: true }, // In seconds
    type: {
      type: String, // Corrected from [String]
      enum: ['incoming', 'outgoing'],
      required: true,
    },
    outcome: {
      type: String,
      enum: ['successful', 'missed', 'follow-up', 'failed'],
      required: true,
    },
    comment: { type: String, maxlength: 500 },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false, // Disable built-in timestamps
    collection: 'call_logs',
  }
);

// Compound indexes for analytics queries
callLogSchema.index({ officerId: 1, timestamp: -1 });
callLogSchema.index({ clientId: 1, timestamp: -1 });

export default model('CallLog', callLogSchema);