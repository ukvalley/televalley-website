const express = require('express');
const router = express.Router();

// CMS content storage
let content = {
  hero: {
    headline: "Sell From Anywhere. Miss Nothing.",
    subheadline: "The mobile-first, SIM-based telecalling CRM that transforms your smartphone into a powerful sales engine.",
    ctaPrimary: "Start Free Trial",
    ctaSecondary: "Watch Demo"
  },
  about: {
    title: "About Televalley",
    content: "Televalley was built to conquer the chaos of traditional telecalling..."
  }
};

router.get('/content/:key', (req, res) => {
  const data = content[req.params.key];
  if (!data) return res.status(404).json({ error: 'Content not found' });
  res.json(data);
});

router.put('/content/:key', (req, res) => {
  content[req.params.key] = { ...content[req.params.key], ...req.body };
  res.json(content[req.params.key]);
});

router.get('/content', (req, res) => {
  res.json(content);
});

module.exports = router;
