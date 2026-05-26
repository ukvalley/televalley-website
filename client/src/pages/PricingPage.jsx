import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Check, ArrowRight, HelpCircle, MessageSquare, Zap
} from 'lucide-react';
import useScrollToTop from '../hooks/useScrollToTop';
import { analyticsApi } from '../services/api';

const tiers = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for small teams getting started with SIM-based calling.',
    features: [
      'Up to 5 users',
      '1,000 calls/month',
      'SIM-based calling',
      'Basic follow-up workflows',
      'Call recording',
      'Email support',
      'Mobile app access',
      'Basic analytics'
    ],
    cta: 'Start Free Trial',
    highlighted: false
  },
  {
    name: 'Growth',
    price: '$79',
    period: '/month',
    description: 'For growing teams that need automation and team visibility.',
    features: [
      'Up to 25 users',
      '5,000 calls/month',
      'Everything in Starter',
      'Advanced workflows',
      'Real-time dashboards',
      'CRM integrations',
      'Priority support',
      'Lead scoring',
      'Multi-channel sequences',
      'API access'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with advanced compliance and scale needs.',
    features: [
      'Unlimited users',
      'Unlimited calls',
      'Everything in Growth',
      'SSO & SAML',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'Advanced compliance',
      'On-premise option',
      'Custom training'
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
];

const faqs = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.'
  },
  {
    q: 'Is there a free trial?',
    a: 'Every plan includes a 14-day free trial with full access to all features. No credit card required.'
  },
  {
    q: 'What happens when I exceed my call limit?',
    a: 'You will receive a notification at 80% usage. Additional calls are billed at $0.02/minute, or you can upgrade your plan.'
  },
  {
    q: 'Do you offer annual billing discounts?',
    a: 'Yes. Annual plans include 2 months free — that is a 17% discount compared to monthly billing.'
  }
];

export default function PricingPage() {
  useScrollToTop();

  const handleCta = (ctaName) => {
    analyticsApi.trackEvent('cta_click', { cta: ctaName, location: 'pricing_page' }).catch(() => {});
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Pricing</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-[#8B949E] text-lg">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card relative flex flex-col ${
                tier.highlighted
                  ? 'border-[#C8FF2E]/30 ring-1 ring-[#C8FF2E]/20'
                  : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge text-xs">Most Popular</span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#E6EDF3]">{tier.name}</h2>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold text-[#C8FF2E]">{tier.price}</span>
                  <span className="text-[#8B949E]">{tier.period}</span>
                </div>
                <p className="text-sm text-[#8B949E] mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#E6EDF3]">
                    <Check className="w-4 h-4 text-[#C8FF2E] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={tier.name === 'Enterprise' ? '/contact' : '/trial'}
                onClick={() => handleCta(`${tier.name.toLowerCase()}_cta`)}
                className={`btn w-full justify-center ${
                  tier.highlighted ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-3 pr-4 text-[#8B949E] font-medium">Feature</th>
                  <th className="text-center py-3 px-4 text-[#8B949E] font-medium">Starter</th>
                  <th className="text-center py-3 px-4 text-[#C8FF2E] font-medium">Growth</th>
                  <th className="text-center py-3 px-4 text-[#8B949E] font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-[#E6EDF3]">
                {[
                  ['Users', 'Up to 5', 'Up to 25', 'Unlimited'],
                  ['Calls/month', '1,000', '5,000', 'Unlimited'],
                  ['SIM-based calling', true, true, true],
                  ['Call recording', true, true, true],
                  ['Automated workflows', 'Basic', 'Advanced', 'Custom'],
                  ['Real-time dashboards', false, true, true],
                  ['CRM integrations', false, true, true],
                  ['Multi-channel outreach', false, true, true],
                  ['Lead scoring', false, true, true],
                  ['API access', false, true, true],
                  ['SSO & SAML', false, false, true],
                  ['Dedicated support', false, 'Priority', 'Dedicated manager'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pr-4">{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} className="text-center py-3 px-4">
                        {typeof cell === 'boolean' ? (
                          cell ? (
                            <Check className="w-4 h-4 text-[#C8FF2E] mx-auto" />
                          ) : (
                            <span className="text-[#8B949E]/30">—</span>
                          )
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Pricing FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#C8FF2E] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[#E6EDF3] mb-1">{faq.q}</p>
                    <p className="text-sm text-[#8B949E]">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="card text-center max-w-2xl mx-auto"
        >
          <Zap className="w-8 h-8 text-[#C8FF2E] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#E6EDF3] mb-3">Still have questions?</h2>
          <p className="text-[#8B949E] mb-6">
            Our team is happy to help you find the right plan for your telecalling operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="btn btn-secondary">
              <MessageSquare className="w-4 h-4" />
              Contact Sales
            </Link>
            <Link to="/demo" className="btn btn-primary">
              Book a Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
