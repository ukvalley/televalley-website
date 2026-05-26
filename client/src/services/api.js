import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for analytics session tracking
api.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem('tv_session_id') || generateSessionId();
  localStorage.setItem('tv_session_id', sessionId);
  config.headers['x-session-id'] = sessionId;
  return config;
});

function generateSessionId() {
  return 'tv_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

// Leads API
export const leadsApi = {
  getAll: (params) => api.get('/leads', { params }),
  getById: (id) => api.get(`/leads/${id}`),
  create: (data) => api.post('/leads', data),
  update: (id, data) => api.put(`/leads/${id}`, data),
  delete: (id) => api.delete(`/leads/${id}`),
  getStats: () => api.get('/leads/stats/overview')
};

// Blog API
export const blogApi = {
  getAll: (params) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/post/${slug}`),
  getCategories: () => api.get('/blog/categories'),
  getTags: () => api.get('/blog/tags')
};

// Contact API
export const contactApi = {
  submit: (data) => api.post('/contact', data)
};

// Analytics API
export const analyticsApi = {
  trackEvent: (event, properties = {}) => api.post('/analytics/event', {
    event,
    properties,
    sessionId: localStorage.getItem('tv_session_id'),
    userId: localStorage.getItem('tv_user_id')
  }),
  getDashboard: (params) => api.get('/analytics/dashboard', { params })
};

// CMS API
export const cmsApi = {
  getContent: (key) => api.get(`/cms/content/${key}`),
  getAllContent: () => api.get('/cms/content')
};

// Integrations API
export const integrationsApi = {
  getCrmStatus: () => api.get('/integrations/crm/status'),
  syncCrm: (provider) => api.post('/integrations/crm/sync', { provider })
};

export default api;
