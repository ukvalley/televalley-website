import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, ArrowRight, CheckCircle, Clock, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';
import { analyticsApi } from '../services/api';

export default function DemoPage() {
  useScrollToTop();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', teamSize: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    analyticsApi.trackEvent('demo_request', { ...form }).catch(() => {});
    setSubmitted(true);
  };

  const benefits = [
    'See SIM-based calling in action',
    'Watch automated workflows trigger in real-time',
    'Explore the manager dashboard',
    'Get a personalized ROI calculation'
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="badge mb-4">Watch Demo</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              See Televalley <span className="gradient-text">in Action</span>
            </h1>
            <p className="text-[#8B949E] text-lg max-w-2xl mx-auto">
              Watch how our mobile-first, SIM-based telecalling CRM transforms sales operations in under 15 minutes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="aspect-video rounded-lg bg-gradient-to-br from-[#C8FF2E]/10 to-[#22D3EE]/10 flex items-center justify-center mb-6 relative group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[#C8FF2E] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-[#0D1117] ml-1" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-[#C8FF2E]" />
                  </div>
                  <span className="text-xs text-[#8B949E]">12:34</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#E6EDF3] mb-4">What You'll See</h3>
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#E6EDF3]">
                    <CheckCircle className="w-5 h-5 text-[#C8FF2E] flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-[#C8FF2E] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#E6EDF3] mb-2">Demo Scheduled!</h3>
                  <p className="text-[#8B949E] mb-6">Our team will contact you within 24 hours to confirm your slot.</p>
                  <Link to="/" className="btn btn-secondary">
                    Back to Home
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <Video className="w-6 h-6 text-[#C8FF2E]" />
                    <div>
                      <h3 className="font-semibold text-[#E6EDF3]">Book a Live Demo</h3>
                      <p className="text-sm text-[#8B949E]">15 minutes with our sales team</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label>Full Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label>Work Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label>Company *</label>
                      <input
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label>Team Size</label>
                      <select
                        value={form.teamSize}
                        onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                      >
                        <option value="">Select team size</option>
                        <option value="1-5">1-5 reps</option>
                        <option value="6-20">6-20 reps</option>
                        <option value="21-50">21-50 reps</option>
                        <option value="50+">50+ reps</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-full justify-center">
                      <Calendar className="w-4 h-4" />
                      Schedule Demo
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#8B949E]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 15 min
                    </span>
                    <span>·</span>
                    <span>No commitment</span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
