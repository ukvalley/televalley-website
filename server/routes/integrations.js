const express = require('express');
const router = express.Router();

// Mock CRM integrations
router.get('/crm/status', (req, res) => {
  res.json({
    hubspot: { connected: false, lastSync: null },
    salesforce: { connected: false, lastSync: null },
    zoho: { connected: false, lastSync: null }
  });
});

router.post('/crm/sync', (req, res) => {
  const { provider } = req.body;
  res.json({
    success: true,
    provider,
    message: `${provider} sync initiated`,
    syncedAt: new Date().toISOString(),
    recordsSynced: 0
  });
});

module.exports = router;
