import { motion } from 'framer-motion';
import { Target, Zap, Shield, Globe } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Reliability',
    description: 'Native SIM integration ensures crystal-clear calls with zero dependency on internet bandwidth.'
  },
  {
    icon: Zap,
    title: 'Empowerment',
    description: 'Transform every smartphone into a powerful sales hub, freeing reps from desk-bound constraints.'
  },
  {
    icon: Shield,
    title: 'Efficiency',
    description: 'Automated workflows eliminate manual admin, turning idle time into productive selling time.'
  },
  {
    icon: Globe,
    title: 'Mobility',
    description: 'Manage leads, track calls, and close deals from anywhere—field, office, or remote.'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="section relative">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge mb-4">About Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Conquering the Chaos of
              <span className="gradient-text"> Traditional Telecalling</span>
            </h2>
            <p className="text-[#8B949E] text-lg mb-6 leading-relaxed">
              Televalley was born from a simple observation: sales teams were spending more time fighting
              their tools than selling. VoIP drops, missed follow-ups, and desktop-bound CRMs were
              bleeding revenue every single day.
            </p>
            <p className="text-[#8B949E] text-lg mb-8 leading-relaxed">
              We built Televalley to change that. By leveraging native SIM calling and intelligent
              automation, we turned the smartphone—the device every rep already carries—into the
              ultimate sales engine. No hardware. No dropped calls. No leads left behind.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#161B22] border border-white/5">
                <span className="text-3xl font-bold text-[#C8FF2E]">2024</span>
                <p className="text-sm text-[#8B949E] mt-1">Founded</p>
              </div>
              <div className="p-4 rounded-xl bg-[#161B22] border border-white/5">
                <span className="text-3xl font-bold text-[#C8FF2E]">10K+</span>
                <p className="text-sm text-[#8B949E] mt-1">Active Users</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {values.map((v, i) => (
              <div
                key={i}
                className="card group hover:border-[#C8FF2E]/20"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C8FF2E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C8FF2E]/20 transition-colors">
                  <v.icon className="w-5 h-5 text-[#C8FF2E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#E6EDF3] mb-2">{v.title}</h3>
                <p className="text-sm text-[#8B949E] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
