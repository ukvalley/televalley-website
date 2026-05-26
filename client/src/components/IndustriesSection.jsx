import { motion } from 'framer-motion';
import {
  Building2, Landmark, GraduationCap, Briefcase, HandshakeIcon
} from 'lucide-react';

const industries = [
  {
    icon: Building2,
    name: 'Real Estate',
    description: 'Help agents manage site visits, automate follow-ups after property showings, and track field activity in real-time.',
    stat: '+32% more closed deals'
  },
  {
    icon: Landmark,
    name: 'Insurance',
    description: 'Automate long policy sales cycles with structured nurture sequences and ensure 100% compliance on every call.',
    stat: '15% policy conversion'
  },
  {
    icon: GraduationCap,
    name: 'EdTech',
    description: 'Handle admission season spikes with smart lead prioritization and instant callback workflows for student inquiries.',
    stat: '20% enrollment rate'
  },
  {
    icon: Briefcase,
    name: 'Financial Services',
    description: 'Maintain regulatory compliance with recorded calls while accelerating loan disbursement through faster lead contact.',
    stat: '40% faster disbursement'
  },
  {
    icon: HandshakeIcon,
    name: 'B2B Sales',
    description: 'Empower SDRs to hit 100+ dials per day with auto-dialing, real-time coaching, and automated follow-up sequences.',
    stat: '50% more outbound calls'
  }
];

export default function IndustriesSection() {
  return (
    <section className="section relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Industries Served</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Built for Industries That
            <span className="gradient-text"> Live on the Phone</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            Televalley adapts to the unique telecalling challenges of your industry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#C8FF2E]/10 flex items-center justify-center">
                  <ind.icon className="w-5 h-5 text-[#C8FF2E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#E6EDF3]">{ind.name}</h3>
              </div>
              <p className="text-sm text-[#8B949E] mb-4">{ind.description}</p>
              <div className="mt-auto pt-4 border-t border-white/5">
                <span className="text-sm font-semibold text-[#C8FF2E]">{ind.stat}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
