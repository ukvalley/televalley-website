import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Building2, GraduationCap, Landmark } from 'lucide-react';

const caseStudies = [
  {
    icon: Building2,
    industry: 'Real Estate',
    title: 'How a Mid-Market Brokerage Closed 32% More Deals',
    challenge: 'Agents missing 40-60% of follow-ups; zero visibility into field activity.',
    solution: 'Televalley mobile CRM with automated follow-up sequences and SIM-based calling.',
    results: [
      { metric: '+32%', label: 'Monthly closed deals' },
      { metric: '98%', label: 'Follow-up completion' },
      { metric: '5min', label: 'Avg response time' }
    ],
    color: '#C8FF2E'
  },
  {
    icon: Landmark,
    industry: 'Insurance',
    title: 'Insurance Agency Boosts Policy Conversion to 15%',
    challenge: 'Inconsistent follow-ups, agents cherry-picking leads, scattered data.',
    solution: 'Automated nurture sequences, lead scoring, and real-time manager dashboards.',
    results: [
      { metric: '15%', label: 'Policy conversion' },
      { metric: '100%', label: 'Follow-up compliance' },
      { metric: '-40%', label: 'Agent attrition' }
    ],
    color: '#22D3EE'
  },
  {
    icon: GraduationCap,
    industry: 'EdTech',
    title: 'EdTech Enrollment Team Hits 20% Conversion Rate',
    challenge: 'Peak season overwhelm, slow callbacks, no lead prioritization.',
    solution: 'Smart lead routing, instant callback workflows, and mobile-first CRM.',
    results: [
      { metric: '20%', label: 'Inquiry-to-enrollment' },
      { metric: '2min', label: 'First-call response' },
      { metric: '+35%', label: 'YoY revenue' }
    ],
    color: '#C8FF2E'
  }
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="section relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Case Studies</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Real Teams.
            <span className="gradient-text"> Real Results.</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            See how sales teams across industries transformed their telecalling operations with Televalley.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card group flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${study.color}15` }}
                >
                  <study.icon className="w-5 h-5" style={{ color: study.color }} />
                </div>
                <span className="text-sm font-medium text-[#8B949E]">{study.industry}</span>
              </div>

              <h3 className="text-xl font-bold text-[#E6EDF3] mb-3">{study.title}</h3>

              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider">Challenge</span>
                  <p className="text-sm text-[#E6EDF3]/80 mt-1">{study.challenge}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#8B949E] uppercase tracking-wider">Solution</span>
                  <p className="text-sm text-[#E6EDF3]/80 mt-1">{study.solution}</p>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                {study.results.map((r, j) => (
                  <div key={j} className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3 text-[#C8FF2E]" />
                      <span className="text-lg font-bold text-[#C8FF2E]">{r.metric}</span>
                    </div>
                    <span className="text-xs text-[#8B949E]">{r.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/case-studies" className="btn btn-secondary">
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
