const express = require('express');
const router = express.Router();

// In-memory analytics events
let events = [];

router.post('/event', (req, res) => {
  const { event, properties = {}, userId, sessionId } = req.body;

  const analyticsEvent = {
    id: events.length + 1,
    event,
    properties,
    userId: userId || null,
    sessionId: sessionId || null,
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
    ip: req.ip
  };

  events.push(analyticsEvent);
  res.status(201).json({ received: true });
});

router.get('/dashboard', (req, res) => {
  const { startDate, endDate } = req.query;
  let filtered = events;

  if (startDate) filtered = filtered.filter(e => new Date(e.timestamp) >= new Date(startDate));
  if (endDate) filtered = filtered.filter(e => new Date(e.timestamp) <= new Date(endDate));

  const pageViews = filtered.filter(e => e.event === 'page_view').length;
  const ctaClicks = filtered.filter(e => e.event === 'cta_click').length;
  const formSubmissions = filtered.filter(e => e.event === 'form_submit').length;
  const uniqueSessions = new Set(filtered.map(e => e.sessionId).filter(Boolean)).size;

  const eventsByType = filtered.reduce((acc, e) => {
    acc[e.event] = (acc[e.event] || 0) + 1;
    return acc;
  }, {});

  const dailyStats = filtered.reduce((acc, e) => {
    const date = e.timestamp.split('T')[0];
    if (!acc[date]) acc[date] = { pageViews: 0, events: 0 };
    acc[date].events++;
    if (e.event === 'page_view') acc[date].pageViews++;
    return acc;
  }, {});

  res.json({
    summary: { pageViews, ctaClicks, formSubmissions, uniqueSessions, totalEvents: filtered.length },
    eventsByType,
    dailyStats: Object.entries(dailyStats).map(([date, stats]) => ({ date, ...stats })).sort((a, b) => a.date.localeCompare(b.date)),
    recentEvents: filtered.slice(-50)
  });
});

module.exports = router;
