import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  PhoneCall, Workflow, BarChart3, Users, Bell, Shield,
  Smartphone, MessageSquare, ArrowRight, CheckCircle
} from 'lucide-react';
import useScrollToTop from '../hooks/useScrollToTop';
import { analyticsApi } from '../services/api';

const services = [
  {
    icon: PhoneCall,
    title: 'SIM-Based Smart Calling',
    description: 'Leverage native SIM integration for enterprise-grade call reliability. Zero drops, zero latency, zero dependence on internet bandwidth.',
    benefits: [
      'Crystal-clear call quality',
      'Works without internet',
      'Enterprise-grade reliability',
      'No VoIP latency issues'
    ],
    color: '#C8FF2E'
  },
  {
    icon: Workflow,
    title: 'Automated Follow-Up Workflows',
    description: 'Trigger intelligent follow-up sequences based on call outcomes. Auto-redial no-answers, schedule callbacks, and nurture leads without manual intervention.',
    benefits: [
      'Auto-redial no-answers',
      'Voicemail-triggered SMS',
      'Scheduled callback reminders',
      'Outcome-based sequences'
    ],
    color: '#22D3EE'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Performance Analytics',
    description: 'Gain instant visibility into team call metrics, conversion rates, and pipeline health with live dashboards designed for sales directors.',
    benefits: [
      'Live call tracking',
      'Performance leaderboards',
      'Conversion funnel analytics',
      'Team benchmarking'
    ],
    color: '#C8FF2E'
  },
  {
    icon: Users,
    title: 'Lead Pipeline Management',
    description: 'Manage your entire lead lifecycle from first contact to close. Smart lead routing, priority scoring, and stage tracking keep your pipeline moving.',
    benefits: [
      'Smart lead routing',
      'Priority scoring',
      'Stage tracking',
      'Pipeline velocity insights'
    ],
    color: '#22D3EE'
  },
  {
    icon: Bell,
    title: 'Smart Reminders & Scheduling',
    description: 'Never miss a follow-up with contextual reminders that adapt to call outcomes. Schedule callbacks, site visits, and meetings directly from the call screen.',
    benefits: [
      'Contextual reminders',
      'Schedule callbacks',
      'Site visit planning',
      'Calendar integration'
    ],
    color: '#C8FF2E'
  },
  {
    icon: Shield,
    title: 'Call Recording & Compliance',
    description: 'Automatically record and store every call with searchable transcripts. Ensure regulatory compliance with built-in audit trails and disclosure tracking.',
    benefits: [
      'Auto call recording',
      'Searchable transcripts',
      'Audit trails',
      'Regulatory compliance'
    ],
    color: '#22D3EE'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First CRM',
    description: 'Your entire CRM, dialer, and analytics suite in one mobile app. Reps sell from anywhere without friction.',
    benefits: [
      'Mobile-first design',
      'One-tap calling',
      'Instant lead updates',
      'Offline mode support'
    ],
    color: '#C8FF2E'
  },
  {
    icon: MessageSquare,
    title: 'Multi-Channel Outreach',
    description: 'Blend calls, SMS, WhatsApp, and email into unified sequences. Meet prospects on their preferred channel while maintaining a single conversation thread.',
    benefits: [
      'Unified sequences',
      'Channel preference routing',
      'Single conversation thread',
      'Template library'
    ],
    color: '#22D3EE'
  }
];

export default function ServicesPage() {
  useScrollToTop();

  const handleCta = (ctaName) => {
    analyticsApi.trackEvent('cta_click', { cta: ctaName, location: 'services_page' }).catch(() => {});
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Services</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to <span className="gradient-text">Close More Deals</span>
          </h1>
          <p className="text-[#8B949E] text-lg">
            From SIM-based calling to automated workflows, Televalley provides a complete
            telecalling ecosystem that eliminates lead leakage and maximizes rep productivity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card group"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </div>

              <h2 className="text-2xl font-bold text-[#E6EDF3] mb-3">{service.title}</h2>
              <p className="text-[#8B949E] mb-5 leading-relaxed">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.benefits.map((b, j) => (
                  <li key={j} className="flex items-center gap-2 text-[#E6EDF3]">
                    <CheckCircle className="w-4 h-4 text-[#C8FF2E] flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                to="/trial"
                onClick={() => handleCta(`try_${service.title.toLowerCase().replace(/\s+/g, '_')}`)}
                className="btn btn-ghost text-sm p-0"
              >
                Try it free <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="card text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-[#E6EDF3] mb-3">
            Not sure which plan fits your team?
          </h2>
          <p className="text-[#8B949E] mb-6">
            Our sales team will help you choose the right combination of features for your telecalling operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/trial" onClick={() => handleCta('start_free_trial')} className="btn btn-primary">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/demo" onClick={() => handleCta('watch_demo')} className="btn btn-secondary">
              Book a Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
