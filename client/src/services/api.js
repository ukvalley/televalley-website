import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const isStatic = !import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

api.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem('tv_session_id') || generateSessionId();
  localStorage.setItem('tv_session_id', sessionId);
  config.headers['x-session-id'] = sessionId;
  return config;
});

function generateSessionId() {
  return 'tv_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

// Mock data for static/GitHub Pages builds
const mockBlogPosts = [
  {
    id: 1,
    slug: 'sim-vs-voip-why-sales-teams-are-switching',
    title: 'SIM vs VoIP: Why Sales Teams Are Switching to SIM-Based Calling',
    excerpt: 'Discover why leading sales teams are abandoning VoIP for native SIM-based calling to eliminate drops and boost conversions.',
    content: `<p>VoIP has been the standard for business calling for years, but it comes with significant drawbacks that cost sales teams money every day. Call drops, latency issues, and dependency on internet bandwidth create friction in the sales process.</p><p>SIM-based calling leverages the native cellular network, providing unmatched reliability. When your rep is on a crucial closing call, the last thing you want is a dropped connection due to WiFi instability.</p><h2>The Cost of Dropped Calls</h2><p>Research shows that 34% of prospects who experience a dropped call during a sales conversation never answer again. That\'s a lost opportunity that could have been avoided with reliable SIM-based connectivity.</p>`,
    category: 'Sales Technology',
    tags: ['SIM calling', 'VoIP', 'sales productivity'],
    author: 'Umesh Jain',
    authorRole: 'CEO',
    publishedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    views: 1240
  },
  {
    id: 2,
    slug: 'automated-follow-ups-close-more-deals',
    title: 'How Automated Follow-Ups Help You Close 40% More Deals',
    excerpt: 'Manual follow-ups are killing your conversion rates. Learn how automated telecalling workflows ensure no lead falls through the cracks.',
    content: `<p>The average sales rep follows up with only 20% of leads after the first contact. This isn\'t because reps are lazy—it\'s because manual tracking systems fail under pressure.</p><p>Automated follow-up workflows change the game by triggering actions based on call outcomes. No-answer? Schedule an auto-redial. Voicemail? Trigger a personalized SMS.</p>`,
    category: 'Sales Strategy',
    tags: ['automation', 'follow-ups', 'conversion'],
    author: 'Umesh Jain',
    authorRole: 'CEO',
    publishedAt: '2024-02-01T10:00:00Z',
    status: 'published',
    views: 890
  },
  {
    id: 3,
    slug: 'mobile-first-crm-real-estate',
    title: 'Why Real Estate Teams Need a Mobile-First CRM',
    excerpt: 'Field agents need CRM access on the go. See how a mobile-first telecalling CRM transforms real estate operations.',
    content: `<p>Real estate agents spend 60% of their working hours in the field. Desktop-bound CRMs force them to remember details until they return to the office, resulting in lost information and missed follow-ups.</p><p>A mobile-first CRM puts the entire pipeline in their pocket. Log calls, update lead status, and schedule follow-ups—all while driving to the next property showing.</p>`,
    category: 'Real Estate',
    tags: ['real estate', 'mobile CRM', 'field sales'],
    author: 'Umesh Jain',
    authorRole: 'CEO',
    publishedAt: '2024-02-20T10:00:00Z',
    status: 'published',
    views: 670
  },
  {
    id: 4,
    slug: 'reduce-lead-response-time',
    title: '5 Ways to Reduce Lead Response Time to Under 5 Minutes',
    excerpt: 'Speed to lead is the #1 predictor of conversion. Here are proven strategies to slash your response time.',
    content: `<p>Leads contacted within 5 minutes are 21x more likely to convert than those contacted after 30 minutes. Yet the average company takes 42 hours to respond to a new lead.</p><p>Implementing instant lead assignment, automated dialing sequences, and mobile notifications can bring your response time down to under 5 minutes consistently.</p>`,
    category: 'Sales Strategy',
    tags: ['lead response', 'speed to lead', 'conversion'],
    author: 'Umesh Jain',
    authorRole: 'CEO',
    publishedAt: '2024-03-05T10:00:00Z',
    status: 'published',
    views: 1520
  }
];

const mockCategories = ['Sales Technology', 'Sales Strategy', 'Real Estate'];
const mockTags = ['SIM calling', 'VoIP', 'sales productivity', 'automation', 'follow-ups', 'conversion', 'real estate', 'mobile CRM', 'field sales', 'lead response', 'speed to lead'];

const mockLeads = [];

const mockAnalytics = {
  summary: { pageViews: 1245, ctaClicks: 89, formSubmissions: 34, uniqueSessions: 567, totalEvents: 2345 },
  eventsByType: { page_view: 1245, cta_click: 89, form_submit: 34, blog_post_view: 67, share: 12 },
  dailyStats: [
    { date: '2024-01-01', pageViews: 45, events: 78 },
    { date: '2024-01-02', pageViews: 52, events: 89 },
    { date: '2024-01-03', pageViews: 38, events: 65 },
  ],
  recentEvents: []
};

const withMock = (fn, mockData) => {
  return fn().catch(() => Promise.resolve({ data: mockData }));
};

// Leads API
export const leadsApi = {
  getAll: (params) => withMock(() => api.get('/leads', { params }), { leads: mockLeads, total: mockLeads.length }),
  getById: (id) => api.get(`/leads/${id}`),
  create: (data) => withMock(() => api.post('/leads', data), { id: Date.now(), ...data, status: 'new', score: 0, createdAt: new Date().toISOString() }),
  update: (id, data) => api.put(`/leads/${id}`, data),
  delete: (id) => withMock(() => api.delete(`/leads/${id}`), { message: 'Lead deleted' }),
  getStats: () => withMock(() => api.get('/leads/stats/overview'), { total: 0, byStatus: {}, bySource: {}, avgScore: 0 })
};

// Blog API
export const blogApi = {
  getAll: (params) => withMock(() => api.get('/blog', { params }), { posts: mockBlogPosts, total: mockBlogPosts.length, page: 1, pages: 1 }),
  getBySlug: (slug) => withMock(() => api.get(`/blog/post/${slug}`), mockBlogPosts.find((p) => p.slug === slug) || mockBlogPosts[0]),
  getCategories: () => withMock(() => api.get('/blog/categories'), mockCategories),
  getTags: () => withMock(() => api.get('/blog/tags'), mockTags)
};

// Contact API
export const contactApi = {
  submit: (data) => withMock(() => api.post('/contact', data), { message: 'Message received. We will get back to you shortly.', submission: { id: Date.now(), ...data, status: 'new', createdAt: new Date().toISOString() } })
};

// Analytics API
export const analyticsApi = {
  trackEvent: (event, properties = {}) => api.post('/analytics/event', {
    event,
    properties,
    sessionId: localStorage.getItem('tv_session_id'),
    userId: localStorage.getItem('tv_user_id')
  }).catch(() => {}),
  getDashboard: (params) => withMock(() => api.get('/analytics/dashboard', { params }), mockAnalytics)
};

// CMS API
export const cmsApi = {
  getContent: (key) => withMock(() => api.get(`/cms/content/${key}`), { headline: 'Sell From Anywhere. Miss Nothing.', subheadline: 'The mobile-first, SIM-based telecalling CRM that transforms your smartphone into a powerful sales engine.', ctaPrimary: 'Start Free Trial', ctaSecondary: 'Watch Demo' }),
  getAllContent: () => withMock(() => api.get('/cms/content'), {})
};

// Integrations API
export const integrationsApi = {
  getCrmStatus: () => withMock(() => api.get('/integrations/crm/status'), { hubspot: { connected: false }, salesforce: { connected: false }, zoho: { connected: false } }),
  syncCrm: (provider) => withMock(() => api.post('/integrations/crm/sync', { provider }), { success: true, provider })
};

export default api;
