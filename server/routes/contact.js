const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

let submissions = [];
let subIdCounter = 1;

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').optional().trim(),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('phone').optional().trim(),
  body('company').optional().trim()
];

router.post('/', contactValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const submission = {
    id: subIdCounter++,
    ...req.body,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  submissions.push(submission);
  res.status(201).json({ message: 'Message received. We will get back to you shortly.', submission });
});

router.get('/', (req, res) => {
  res.json({ submissions, total: submissions.length });
});

module.exports = router;
