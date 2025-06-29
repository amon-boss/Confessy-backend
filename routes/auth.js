const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { contact, password, username, isAnonymous } = req.body;

    const email = contact.includes('@') ? contact : null;
    const phone = contact.includes('@') ? null : contact;

    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { phone: phone },
        { username: username }
      ]
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    const user = new User({ email, phone, password, username, isAnonymous });
    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { userInput, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: userInput }, { phone: userInput }, { username: userInput }]
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur de connexion.' });
  }
});

module.exports = router;
