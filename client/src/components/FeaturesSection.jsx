import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { analyticsApi } from '../services/api';

const features = [
  {
    title: 'Native SIM Integration',
    description: 'True SIM-based calling that bypasses VoIP entirely. No more call drops, no latency, no bandwidth anxiety.',
    checks: ['Crystal-clear call quality', 'Works without internet', 'Enterprise-grade reliability']
  },
  {
    title: 'Automated Telecalling Workflows',
    description: 'Smart sequences that trigger follow-ups based on call outcomes. No lead ever falls through the cracks.',
    checks: ['Auto-redial no-answers', 'Voicemail-triggered SMS', 'Scheduled callback reminders']
  },
  {
    title: 'Real-Time Team Dashboards',
    description: 'Live visibility into who is calling, conversion rates, and pipeline health—all from a single screen.',
    checks: ['Live call tracking', 'Performance leaderboards', 'Conversion funnel analytics']
  },
  {
    title: 'Smartphone Sales Hub',
    description: 'Your entire CRM, dialer, and analytics suite in one mobile app. Reps sell from anywhere without friction.',
    checks: ['Mobile-first design', 'One-tap calling', 'Instant lead updates']
  },
  {
    title: 'Lead Scoring & Prioritization',
    description: 'AI-powered lead scoring that surfaces hot prospects so reps focus on deals most likely to close.',
    checks: ['Behavioral scoring', 'Priority queues', 'Hot lead alerts']
  },
  {
    title: 'CRM Integrations',
    description: 'Seamlessly connect with HubSpot, Salesforce, Zoho, and more. Sync leads, contacts, and activities automatically.',
    checks: ['Two-way sync', 'Custom field mapping', 'Webhook support']
  },
  {
    title: 'Call Analytics & Reporting',
    description: 'Deep insights into call duration, outcomes, and rep performance. Make data-driven coaching decisions.',
    checks: ['Call outcome tracking', 'Rep scorecards', 'Trend analysis']
  },
  {
    title: 'Compliance & Security',
    description: 'Built-in call recording, consent management, and data encryption to meet regulatory requirements.',
    checks: ['End-to-end encryption', 'GDPR compliant', 'Audit trails']
  }
];

export default function FeaturesSection() {
  const handleCta = () => {
    analyticsApi.trackEvent('cta_click', { cta: 'explore_features', location: 'features' }).catch(() => {});
  };

  return (
    <section id="features" className="section relative bg-[#161B22]/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Features</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Built for Teams That
            <span className="gradient-text"> Demand Results</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            Every feature in Televalley is designed to eliminate friction and drive conversions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card group"
            >
              <h3 className="text-xl font-semibold text-[#E6EDF3] mb-2">{feature.title}</h3>
              <p className="text-[#8B949E] mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.checks.map((check, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-[#E6EDF3]">
                    <Check className="w-4 h-4 text-[#C8FF2E] flex-shrink-0" />
                    {check}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/trial"
            onClick={handleCta}
            className="btn btn-primary"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
