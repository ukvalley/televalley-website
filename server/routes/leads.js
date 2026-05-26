const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// In-memory storage (replace with MongoDB in production)
let leads = [];
let leadIdCounter = 1;

// Validation middleware
const leadValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('message').optional().trim(),
  body('source').optional().trim(),
  body('score').optional().isInt({ min: 0, max: 100 })
];

// GET all leads
router.get('/', (req, res) => {
  const { status, source, sortBy = 'createdAt', order = 'desc' } = req.query;
  let result = [...leads];

  if (status) result = result.filter(l => l.status === status);
  if (source) result = result.filter(l => l.source === source);

  result.sort((a, b) => {
    const aVal = a[sortBy] || a.createdAt;
    const bVal = b[sortBy] || b.createdAt;
    return order === 'desc' ? new Date(bVal) - new Date(aVal) : new Date(aVal) - new Date(bVal);
  });

  res.json({ leads: result, total: result.length });
});

// GET lead by ID
router.get('/:id', (req, res) => {
  const lead = leads.find(l => l.id === parseInt(req.params.id));
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  res.json(lead);
});

// POST create lead
router.post('/', leadValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const lead = {
    id: leadIdCounter++,
    ...req.body,
    status: req.body.status || 'new',
    score: req.body.score || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  leads.push(lead);
  res.status(201).json(lead);
});

// PUT update lead
router.put('/:id', (req, res) => {
  const index = leads.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Lead not found' });

  leads[index] = { ...leads[index], ...req.body, updatedAt: new Date().toISOString() };
  res.json(leads[index]);
});

// DELETE lead
router.delete('/:id', (req, res) => {
  const index = leads.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Lead not found' });

  leads.splice(index, 1);
  res.json({ message: 'Lead deleted' });
});

// GET lead statistics
router.get('/stats/overview', (req, res) => {
  const total = leads.length;
  const byStatus = leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});
  const bySource = leads.reduce((acc, l) => {
    acc[l.source || 'unknown'] = (acc[l.source || 'unknown'] || 0) + 1;
    return acc;
  }, {});
  const avgScore = total > 0 ? leads.reduce((sum, l) => sum + (l.score || 0), 0) / total : 0;

  res.json({ total, byStatus, bySource, avgScore: Math.round(avgScore) });
});

module.exports = router;
