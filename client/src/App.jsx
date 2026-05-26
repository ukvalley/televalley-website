import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { analyticsApi } from './services/api';
import { ThemeProvider } from './hooks/useTheme';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import DemoPage from './pages/DemoPage';
import TrialPage from './pages/TrialPage';
import ServicesPage from './pages/ServicesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import PricingPage from './pages/PricingPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  useEffect(() => {
    const trackPageView = () => {
      analyticsApi.trackEvent('page_view', {
        path: window.location.hash.replace('#', '') || '/',
        title: document.title,
        referrer: document.referrer
      }).catch(() => {});
    };
    trackPageView();
    const handleRouteChange = () => trackPageView();
    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/trial" element={<TrialPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
