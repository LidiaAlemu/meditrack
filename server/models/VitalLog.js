const mongoose = require('mongoose');

const vitalLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  systolic: {
    type: Number,
    min: 50,
    max: 250,
  },
  diastolic: {
    type: Number,
    min: 30,
    max: 150,
  },
  heartRate: {
    type: Number,
    min: 30,
    max: 250,
  },
  weight: {
    type: Number,
    min: 20,
    max: 300,
  },
  bloodSugar: {
    type: Number,
    min: 50,
    max: 500,
  },
  notes: {
    type: String,
    maxlength: 500,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('VitalLog', vitalLogSchema);