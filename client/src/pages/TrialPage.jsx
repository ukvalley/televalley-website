import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Clock, Zap, CreditCard } from 'lucide-react';
import useScrollToTop from '../hooks/useScrollToTop';
import { analyticsApi } from '../services/api';

export default function TrialPage() {
  useScrollToTop();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', teamSize: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    analyticsApi.trackEvent('trial_signup', { ...form }).catch(() => {});
    setSubmitted(true);
  };

  const features = [
    'Full access to all features',
    'No credit card required',
    'Cancel anytime',
    'Dedicated onboarding support'
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
            <span className="badge mb-4">Free Trial</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your <span className="gradient-text">Free Trial</span>
            </h1>
            <p className="text-[#8B949E] text-lg max-w-2xl mx-auto">
              14 days of full access. No credit card. No commitments. Just results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 space-y-6"
            >
              <div className="card">
                <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#E6EDF3]">
                      <CheckCircle className="w-5 h-5 text-[#C8FF2E]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-[#E6EDF3] mb-4">After Trial</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#0D1117] border border-white/5">
                    <div>
                      <p className="font-medium text-[#E6EDF3]">Starter</p>
                      <p className="text-xs text-[#8B949E]">Up to 5 users</p>
                    </div>
                    <span className="text-[#C8FF2E] font-bold">$29/mo</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#0D1117] border border-[#C8FF2E]/20">
                    <div>
                      <p className="font-medium text-[#E6EDF3]">Growth</p>
                      <p className="text-xs text-[#8B949E]">Up to 25 users</p>
                    </div>
                    <span className="text-[#C8FF2E] font-bold">$79/mo</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#0D1117] border border-white/5">
                    <div>
                      <p className="font-medium text-[#E6EDF3]">Enterprise</p>
                      <p className="text-xs text-[#8B949E]">Unlimited users</p>
                    </div>
                    <span className="text-[#C8FF2E] font-bold">Custom</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-3"
            >
              {submitted ? (
                <div className="card text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[#C8FF2E] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#E6EDF3] mb-2">Welcome Aboard!</h3>
                  <p className="text-[#8B949E] mb-6">
                    Check your email for setup instructions. Your 14-day trial starts now.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-[#8B949E]">
                    <Clock className="w-4 h-4" />
                    Trial expires in 14 days
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card space-y-5">
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
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
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
                  <button type="submit" className="btn btn-primary w-full justify-center text-lg">
                    <Zap className="w-5 h-5" />
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#8B949E]">
                    <Shield className="w-3 h-3" />
                    Your data is secure and never shared
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
