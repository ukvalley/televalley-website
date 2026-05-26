import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, TrendingUp, Building2, GraduationCap, Landmark,
  Briefcase, CheckCircle, ArrowUpRight, PhoneCall
} from 'lucide-react';
import useScrollToTop from '../hooks/useScrollToTop';
import { analyticsApi } from '../services/api';

const caseStudies = [
  {
    icon: Building2,
    industry: 'Real Estate',
    company: 'Metro Realty Group',
    title: 'How a Mid-Market Brokerage Closed 32% More Deals',
    challenge: 'Agents missing 40-60% of follow-ups; zero visibility into field activity; manual data entry consuming 2+ hours per agent daily.',
    solution: 'Televalley mobile CRM with automated follow-up sequences, SIM-based calling, and real-time manager dashboards for field teams.',
    results: [
      { metric: '+32%', label: 'Monthly closed deals' },
      { metric: '98%', label: 'Follow-up completion rate' },
      { metric: '5min', label: 'Average response time' },
      { metric: '2hrs', label: 'Admin time saved daily' }
    ],
    testimonial: {
      quote: 'Before Televalley, our agents were spending more time on admin than selling. Now, with automated follow-ups and SIM-based calling, our team is actually closing deals instead of fighting software.',
      author: 'Broker Brad',
      role: 'Broker / Owner'
    },
    color: '#C8FF2E'
  },
  {
    icon: Landmark,
    industry: 'Insurance',
    company: 'SecureLife Insurance Agency',
    title: 'Insurance Agency Boosts Policy Conversion to 15%',
    challenge: 'Inconsistent follow-ups, agents cherry-picking leads, scattered data across WhatsApp and sheets, high agent attrition.',
    solution: 'Automated nurture sequences, lead scoring, real-time manager dashboards, and structured follow-up cadences.',
    results: [
      { metric: '15%', label: 'Policy conversion rate' },
      { metric: '100%', label: 'Follow-up compliance' },
      { metric: '-40%', label: 'Agent attrition' },
      { metric: '+25%', label: 'Monthly premium' }
    ],
    testimonial: {
      quote: 'Our policy conversion jumped from 8% to 14% in 90 days. The automated nurture sequences mean no lead goes cold, and the SIM calling quality is miles ahead of our old VoIP setup.',
      author: 'Agency-Owner Arjun',
      role: 'Founder & CEO'
    },
    color: '#22D3EE'
  },
  {
    icon: GraduationCap,
    industry: 'EdTech',
    company: 'EduPro Institute',
    title: 'EdTech Enrollment Team Hits 20% Conversion Rate',
    challenge: 'Peak admission season overwhelm, slow callbacks losing enrollments to competitors, no lead prioritization, VoIP quality issues during parent conversations.',
    solution: 'Smart lead routing, instant callback workflows, mobile-first CRM, and priority queues during peak season.',
    results: [
      { metric: '20%', label: 'Inquiry-to-enrollment' },
      { metric: '2min', label: 'First-call response' },
      { metric: '+35%', label: 'YoY revenue' },
      { metric: '98%', label: 'Follow-up completion' }
    ],
    testimonial: {
      quote: 'During peak admission season, Televalley handled 4x our normal lead volume without breaking a sweat. Smart prioritization meant our best prospects got called first.',
      author: 'Admissions Anna',
      role: 'Director of Admissions'
    },
    color: '#C8FF2E'
  },
  {
    icon: Briefcase,
    industry: 'B2B Sales',
    company: 'GrowthStack Solutions',
    title: 'B2B Inside Sales Team Hits 100+ Dials Per Rep',
    challenge: 'SDRs spending more time on admin than selling, no auto-redial, manager cannot see real-time call activity, follow-ups falling through.',
    solution: 'Auto-dialing sequences, one-tap calling from mobile, real-time dashboards, and automated follow-up workflows.',
    results: [
      { metric: '+50%', label: 'Outbound call volume' },
      { metric: '100+', label: 'Dials per SDR daily' },
      { metric: '8%', label: 'Appointment booking rate' },
      { metric: '+30%', label: 'Monthly revenue' }
    ],
    testimonial: {
      quote: 'The auto-dial feature alone saved us 30 minutes per rep per day. That is 2.5 hours of extra selling time daily across the team. Our appointment rate went from 3% to 8%.',
      author: 'Sales Director Sam',
      role: 'Director of Inside Sales'
    },
    color: '#22D3EE'
  }
];

export default function CaseStudiesPage() {
  useScrollToTop();

  const handleCta = (ctaName) => {
    analyticsApi.trackEvent('cta_click', { cta: ctaName, location: 'case_studies_page' }).catch(() => {});
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Case Studies</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Real Teams. <span className="gradient-text">Real Results.</span>
          </h1>
          <p className="text-[#8B949E] text-lg">
            See how sales teams across industries transformed their telecalling operations
            with Televalley's mobile-first, SIM-based CRM.
          </p>
        </motion.div>

        <div className="space-y-16">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${study.color}15` }}
                    >
                      <study.icon className="w-6 h-6" style={{ color: study.color }} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-[#8B949E]">{study.industry}</span>
                      <p className="text-xs text-[#8B949E]/70">{study.company}</p>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-[#E6EDF3] mb-6">{study.title}</h2>

                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">Challenge</span>
                      </div>
                      <p className="text-[#8B949E]">{study.challenge}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-[#C8FF2E]" />
                        <span className="text-sm font-semibold text-[#C8FF2E] uppercase tracking-wider">Solution</span>
                      </div>
                      <p className="text-[#8B949E]">{study.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {study.results.map((r, j) => (
                      <div
                        key={j}
                        className="p-4 rounded-xl bg-[#0D1117] border border-white/5 text-center"
                      >
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="w-4 h-4 text-[#C8FF2E]" />
                          <span className="text-2xl font-bold text-[#C8FF2E]">{r.metric}</span>
                        </div>
                        <span className="text-xs text-[#8B949E]">{r.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-xl bg-gradient-to-br from-[#C8FF2E]/5 to-[#22D3EE]/5 border border-[#C8FF2E]/10">
                    <PhoneCall className="w-5 h-5 text-[#C8FF2E] mb-3" />
                    <blockquote className="text-[#E6EDF3] italic mb-4">"{study.testimonial.quote}"</blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8FF2E]/20 to-[#22D3EE]/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#C8FF2E]">
                          {study.testimonial.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#E6EDF3]">{study.testimonial.author}</p>
                        <p className="text-xs text-[#8B949E]">{study.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="card text-center max-w-2xl mx-auto mt-16"
        >
          <h2 className="text-2xl font-bold text-[#E6EDF3] mb-3">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-[#8B949E] mb-6">
            Join hundreds of teams who have transformed their telecalling with Televalley.
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
