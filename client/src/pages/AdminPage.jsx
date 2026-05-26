import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, Settings, BarChart3,
  LogOut, Menu, X, ChevronRight, Trash2, Edit3, Eye,
  Search, Filter, Plus, AlertTriangle, CheckCircle
} from 'lucide-react';
import { leadsApi, blogApi, analyticsApi } from '../services/api';
import useScrollToTop from '../hooks/useScrollToTop';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'cms', label: 'CMS', icon: Settings }
];

export default function AdminPage() {
  useScrollToTop();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="pt-20 min-h-screen bg-[#0D1117]">
      <div className="flex">
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#161B22] border-r border-white/5 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:min-h-screen`}>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#C8FF2E] flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-[#0D1117]" />
              </div>
              <span className="text-lg font-bold text-[#E6EDF3]">Admin</span>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#C8FF2E]/10 text-[#C8FF2E]'
                      : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
            <Link to="/" className="flex items-center gap-2 text-sm text-[#8B949E] hover:text-[#E6EDF3]">
              <LogOut className="w-4 h-4" />
              Exit Admin
            </Link>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="p-4 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-[#E6EDF3]"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-xl font-bold text-[#E6EDF3]">{tabs.find((t) => t.id === activeTab)?.label}</h1>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && <DashboardTab />}
                {activeTab === 'leads' && <LeadsTab />}
                {activeTab === 'blog' && <BlogTab />}
                {activeTab === 'analytics' && <AnalyticsTab />}
                {activeTab === 'cms' && <CMSTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function DashboardTab() {
  const [stats, setStats] = useState({ totalLeads: 0, totalPosts: 0, totalEvents: 0, totalContacts: 0 });

  useEffect(() => {
    Promise.all([
      leadsApi.getAll(),
      blogApi.getAll(),
      analyticsApi.getDashboard()
    ]).then(([leadsRes, blogRes, analyticsRes]) => {
      setStats({
        totalLeads: leadsRes.data.total || 0,
        totalPosts: blogRes.data.total || 0,
        totalEvents: analyticsRes.data.summary?.totalEvents || 0,
        totalContacts: 0
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: '#C8FF2E' },
    { label: 'Blog Posts', value: stats.totalPosts, icon: FileText, color: '#22D3EE' },
    { label: 'Events Tracked', value: stats.totalEvents, icon: BarChart3, color: '#C8FF2E' },
    { label: 'Contact Submissions', value: stats.totalContacts, icon: LayoutDashboard, color: '#22D3EE' }
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="card">
          <div className="flex items-center justify-between mb-2">
            <card.icon className="w-5 h-5" style={{ color: card.color }} />
            <ChevronRight className="w-4 h-4 text-[#8B949E]" />
          </div>
          <span className="text-3xl font-bold text-[#E6EDF3]">{card.value}</span>
          <p className="text-sm text-[#8B949E]">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

function LeadsTab() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leadsApi.getAll().then((res) => {
      setLeads(res.data.leads || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const deleteLead = (id) => {
    leadsApi.delete(id).then(() => {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }).catch(() => {});
  };

  if (loading) return <p className="text-[#8B949E]">Loading leads...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B949E]" />
          <input placeholder="Search leads..." className="pl-9" />
        </div>
        <button className="btn btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left">
              {['ID', 'Name', 'Email', 'Company', 'Status', 'Score', 'Actions'].map((h) => (
                <th key={h} className="py-3 px-3 text-[#8B949E] font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#8B949E]">No leads yet.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 text-[#8B949E]">#{lead.id}</td>
                  <td className="py-3 px-3 text-[#E6EDF3]">{lead.name}</td>
                  <td className="py-3 px-3"><a href={`mailto:${lead.email}`} className="hover:text-[#C8FF2E]">{lead.email}</a></td>
                  <td className="py-3 px-3 text-[#8B949E]">{lead.company || '—'}</td>
                  <td className="py-3 px-3">
                    <span className={`badge text-xs ${
                      lead.status === 'new' ? '' :
                      lead.status === 'contacted' ? 'bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20' :
                      lead.status === 'qualified' ? 'bg-[#C8FF2E]/10 text-[#C8FF2E] border-[#C8FF2E]/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#C8FF2E]"
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#8B949E]">{lead.score}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-white/5 text-[#8B949E] hover:text-[#C8FF2E]">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-white/5 text-[#8B949E] hover:text-[#C8FF2E]">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-1.5 rounded hover:bg-white/5 text-[#8B949E] hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BlogTab() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogApi.getAll().then((res) => {
      setPosts(res.data.posts || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-[#8B949E]">Loading posts...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B949E]" />
          <input placeholder="Search posts..." className="pl-9" />
        </div>
        <button className="btn btn-primary text-sm">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="card flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[#E6EDF3] truncate">{post.title}</h3>
                <span className={`badge text-xs ${
                  post.status === 'published'
                    ? 'bg-[#C8FF2E]/10 text-[#C8FF2E] border-[#C8FF2E]/20'
                    : 'bg-[#8B949E]/10 text-[#8B949E] border-[#8B949E]/20'
                }`}>
                  {post.status}
                </span>
              </div>
              <p className="text-xs text-[#8B949E] truncate">
                {post.category} · {post.author} · {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Link to={`/blog/${post.slug}`} className="p-1.5 rounded hover:bg-white/5 text-[#8B949E] hover:text-[#C8FF2E]">
                <Eye className="w-3.5 h-3.5" />
              </Link>
              <button className="p-1.5 rounded hover:bg-white/5 text-[#8B949E] hover:text-[#C8FF2E]">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/5 text-[#8B949E] hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const [data, setData] = useState(null);

  useEffect(() => {
    analyticsApi.getDashboard().then((res) => setData(res.data)).catch(() => {});
  }, []);

  if (!data) return <p className="text-[#8B949E]">Loading analytics...</p>;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Page Views', value: data.summary?.pageViews || 0 },
          { label: 'CTA Clicks', value: data.summary?.ctaClicks || 0 },
          { label: 'Form Submissions', value: data.summary?.formSubmissions || 0 },
          { label: 'Unique Sessions', value: data.summary?.uniqueSessions || 0 }
        ].map((s, i) => (
          <div key={i} className="card">
            <span className="text-3xl font-bold text-[#E6EDF3]">{s.value}</span>
            <p className="text-sm text-[#8B949E]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="font-semibold text-[#E6EDF3] mb-4">Events by Type</h3>
        <div className="space-y-2">
          {Object.entries(data.eventsByType || {}).map(([event, count]) => (
            <div key={event} className="flex items-center gap-3">
              <span className="text-sm text-[#8B949E] w-32 truncate">{event}</span>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#C8FF2E]"
                  style={{
                    width: `${Math.min(100, (count / (data.summary?.totalEvents || 1)) * 100)}%`
                  }}
                />
              </div>
              <span className="text-sm text-[#E6EDF3] w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-[#E6EDF3] mb-4">Recent Events</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {(data.recentEvents || []).slice().reverse().map((e, i) => (
            <div key={i} className="flex items-center gap-3 text-sm py-1">
              <span className="badge text-xs">{e.event}</span>
              <span className="text-[#8B949E] text-xs">{new Date(e.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CMSTab() {
  const [content, setContent] = useState({
    hero: { headline: '', subheadline: '', ctaPrimary: '', ctaSecondary: '' }
  });

  const handleSave = () => {
    alert('CMS content saved (demo mode)');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="card space-y-4">
        <h3 className="font-semibold text-[#E6EDF3]">Hero Section</h3>
        <div>
          <label>Headline</label>
          <input
            value={content.hero.headline}
            onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })}
            placeholder="Sell From Anywhere. Miss Nothing."
          />
        </div>
        <div>
          <label>Subheadline</label>
          <textarea
            rows={3}
            value={content.hero.subheadline}
            onChange={(e) => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })}
            placeholder="The mobile-first, SIM-based telecalling CRM..."
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label>Primary CTA</label>
            <input
              value={content.hero.ctaPrimary}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaPrimary: e.target.value } })}
              placeholder="Start Free Trial"
            />
          </div>
          <div>
            <label>Secondary CTA</label>
            <input
              value={content.hero.ctaSecondary}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaSecondary: e.target.value } })}
              placeholder="Watch Demo"
            />
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="btn btn-primary">
        <CheckCircle className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  );
}
