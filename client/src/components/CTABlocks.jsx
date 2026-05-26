import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Clock, AlertTriangle } from 'lucide-react';
import { analyticsApi } from '../services/api';

export default function CTABlocks() {
  const handleCta = (ctaName, location) => {
    analyticsApi.trackEvent('cta_click', { cta: ctaName, location }).catch(() => {});
  };

  return (
    <>
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C8FF2E]/5 to-[#22D3EE]/5" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-[#C8FF2E]" />
              <span className="text-sm font-medium text-[#C8FF2E]">Every Day You Wait = More Lost Leads</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Stop Losing Deals to
              <span className="gradient-text"> Missed Follow-Ups?</span>
            </h2>

            <p className="text-[#8B949E] text-lg mb-8 max-w-2xl mx-auto">
              Join 10,000+ sales professionals who transformed their telecalling operations.
              Start your free 14-day trial today—no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/trial"
                onClick={() => handleCta('start_free_trial', 'cta_block_primary')}
                className="btn btn-primary text-lg animate-pulse-glow"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/demo"
                onClick={() => handleCta('watch_demo', 'cta_block_primary')}
                className="btn btn-secondary text-lg"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-[#8B949E]">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> 14-day free trial
              </span>
              <span>·</span>
              <span>No credit card required</span>
              <span>·</span>
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
