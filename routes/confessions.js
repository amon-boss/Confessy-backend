const express = require('express');
const router = express.Router();
const Confession = require('../models/Confession');

// Poster une confession
router.post('/', async (req, res) => {
  try {
    const confession = new Confession(req.body);
    await confession.save();
    res.json({ success: true, confession });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la confession.' });
  }
});

// Récupérer toutes les confessions
router.get('/', async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 });
    res.json(confessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors du chargement.' });
  }
});

module.exports = router;
