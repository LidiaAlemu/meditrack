const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication.js');
const requireAuth = require('./auth');

router.use(requireAuth);

// GET all medications for current user
router.get('/', async (req, res) => {
  try {
    const medications = await Medication.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medications', error: error.message });
  }
});

// POST create new medication
router.post('/', async (req, res) => {
  try {
    const { name, dosage, frequency } = req.body;
    
    const newMedication = new Medication({
      userId: req.userId,
      name,
      dosage,
      frequency
    });

    const savedMedication = await newMedication.save();
    res.status(201).json(savedMedication);
  } catch (error) {
    res.status(400).json({ message: 'Error creating medication', error: error.message });
  }
});

// PATCH mark medication as taken/not taken
router.patch('/:id/taken', async (req, res) => {
  try {
    const medication = await Medication.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    medication.isTaken = !medication.isTaken;
    if (medication.isTaken) {
      medication.lastTaken = new Date();
    }

    const updatedMedication = await medication.save();
    res.json(updatedMedication);
  } catch (error) {
    res.status(500).json({ message: 'Error updating medication', error: error.message });
  }
});

// DELETE a medication
router.delete('/:id', async (req, res) => {
  try {
    const medication = await Medication.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    await Medication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting medication', error: error.message });
  }
});

module.exports = router;