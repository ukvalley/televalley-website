import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { contactApi, analyticsApi } from '../services/api';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      await contactApi.submit(form);
      analyticsApi.trackEvent('form_submit', { form: 'contact', source: 'contact_page' }).catch(() => {});
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.errors?.[0]?.msg || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="section relative bg-[#161B22]/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Contact</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Let's Start a
            <span className="gradient-text"> Conversation</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            Ready to eliminate dropped calls and missed follow-ups? Get in touch and we'll show you how.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-[#E6EDF3] mb-4">Get in Touch</h3>
              <p className="text-[#8B949E] mb-6">
                Have questions about how Televalley can transform your sales operations?
                Our team is ready to help.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C8FF2E]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#C8FF2E]" />
                </div>
                <div>
                  <p className="font-medium text-[#E6EDF3]">Email</p>
                  <a href="mailto:umesh@ukvalley.com" className="text-[#8B949E] hover:text-[#C8FF2E]">
                    umesh@ukvalley.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C8FF2E]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#C8FF2E]" />
                </div>
                <div>
                  <p className="font-medium text-[#E6EDF3]">Phone</p>
                  <a href="tel:+919890437811" className="text-[#8B949E] hover:text-[#C8FF2E]">
                    +91 98904 37811
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#C8FF2E]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C8FF2E]" />
                </div>
                <div>
                  <p className="font-medium text-[#E6EDF3]">Location</p>
                  <p className="text-[#8B949E]">Nashik, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-[#C8FF2E]/5 to-[#22D3EE]/5 border border-[#C8FF2E]/10">
              <p className="text-sm text-[#E6EDF3] font-medium mb-2">Prefer a live walkthrough?</p>
              <p className="text-sm text-[#8B949E] mb-4">
                Schedule a 15-minute demo with our sales team.
              </p>
              <Link to="/demo" className="btn btn-primary text-sm w-full justify-center">
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <div className="card text-center py-16">
                <CheckCircle className="w-16 h-16 text-[#C8FF2E] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#E6EDF3] mb-2">Message Sent!</h3>
                <p className="text-[#8B949E] mb-6">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your telecalling challenges..."
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-primary w-full justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
