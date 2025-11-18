const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dosage: {
    type: String,
    required: true,
    trim: true,
  },
  frequency: {
    type: String,
    required: true,
    enum: ['once daily', 'twice daily', 'three times daily', 'as needed'],
    default: 'once daily',
  },
  isTaken: {
    type: Boolean,
    default: false,
  },
  lastTaken: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Medication', medicationSchema);