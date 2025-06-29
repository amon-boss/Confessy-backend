const express = require('express');
const router = express.Router();
const Confession = require('../models/Confession');
const verifyToken = require('../middleware/auth');

// Poster une confession (protégé)
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.user.username;

    const confession = new Confession({
      userId,
      username,
      anonymous: req.body.anonymous || false,
      content: req.body.content,
      likes: [],
      comments: [],
      createdAt: new Date()
    });

    await confession.save();
    res.json({ success: true, confession });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la confession.' });
  }
});

// Récupérer toutes les confessions (publique)
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
