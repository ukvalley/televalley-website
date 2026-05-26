import { Link } from 'react-router-dom';
import { ArrowRight, Play, Phone, Shield, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyticsApi } from '../services/api';

const stats = [
  { icon: Phone, label: 'Zero Call Drops', value: 'SIM-based' },
  { icon: Shield, label: 'Follow-up Rate', value: '100%' },
  { icon: TrendingUp, label: 'Conversion Boost', value: '+40%' },
  { icon: Users, label: 'Active Users', value: '10,000+' }
];

export default function HeroSection() {
  const handleCta = (ctaName) => {
    analyticsApi.trackEvent('cta_click', { cta: ctaName, location: 'hero' }).catch(() => {});
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C8FF2E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#22D3EE]/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge mb-6 inline-flex">
              <span className="w-2 h-2 rounded-full bg-[#C8FF2E] animate-pulse" />
              Now in Public Beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            Sell From Anywhere.
            <br />
            <span className="gradient-text">Miss Nothing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#8B949E] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The mobile-first, SIM-based telecalling CRM that transforms your smartphone
            into a powerful sales engine. Eliminate dropped VoIP calls and never miss
            a follow-up again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/trial"
              onClick={() => handleCta('start_free_trial')}
              className="btn btn-primary text-base animate-pulse-glow"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              onClick={() => handleCta('watch_demo')}
              className="btn btn-secondary text-base"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="card flex flex-col items-center text-center p-4 md:p-6"
              >
                <stat.icon className="w-6 h-6 text-[#C8FF2E] mb-2" />
                <span className="text-xl md:text-2xl font-bold text-[#E6EDF3]">{stat.value}</span>
                <span className="text-xs text-[#8B949E]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
