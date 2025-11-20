const express = require('express');
const router = express.Router();
const VitalLog = require('../models/VitalLog.js');
const requireAuth = require('./auth');

// Apply authentication to all routes
router.use(requireAuth);

// GET all vital logs for current user
router.get('/', async (req, res) => {
  try {
    const vitalLogs = await VitalLog.find({ userId: req.auth.userId })
      .sort({ date: -1 })
      .limit(50);
    res.json(vitalLogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vital logs', error: error.message });
  }
});

// POST create new vital log
router.post('/', async (req, res) => {
  try {
    const { systolic, diastolic, heartRate, weight, bloodSugar, notes } = req.body;
    
    const newVitalLog = new VitalLog({
      userId: req.auth.userId,
      systolic,
      diastolic,
      heartRate,
      weight,
      bloodSugar,
      notes,
      date: new Date()
    });

    const savedLog = await newVitalLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(400).json({ message: 'Error creating vital log', error: error.message });
  }
});

// DELETE a vital log
router.delete('/:id', async (req, res) => {
  try {
    const log = await VitalLog.findOne({ _id: req.params.id, userId: req.auth.userId });
    
    if (!log) {
      return res.status(404).json({ message: 'Vital log not found' });
    }

    await VitalLog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vital log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vital log', error: error.message });
  }
});

module.exports = router;