import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  PhoneCall, Workflow, BarChart3, Users, Bell, Shield,
  Smartphone, MessageSquare, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: PhoneCall,
    title: 'SIM-Based Smart Calling',
    description: 'Leverage native SIM integration for enterprise-grade call reliability. Zero drops, zero latency, zero dependence on internet bandwidth.',
    color: '#C8FF2E'
  },
  {
    icon: Workflow,
    title: 'Automated Follow-Up Workflows',
    description: 'Trigger intelligent follow-up sequences based on call outcomes. Auto-redial no-answers, schedule callbacks, and nurture leads without manual intervention.',
    color: '#22D3EE'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Performance Analytics',
    description: 'Gain instant visibility into team call metrics, conversion rates, and pipeline health with live dashboards designed for sales directors.',
    color: '#C8FF2E'
  },
  {
    icon: Users,
    title: 'Lead Pipeline Management',
    description: 'Manage your entire lead lifecycle from first contact to close. Smart lead routing, priority scoring, and stage tracking keep your pipeline moving.',
    color: '#22D3EE'
  },
  {
    icon: Bell,
    title: 'Smart Reminders & Scheduling',
    description: 'Never miss a follow-up with contextual reminders that adapt to call outcomes. Schedule callbacks, site visits, and meetings directly from the call screen.',
    color: '#C8FF2E'
  },
  {
    icon: Shield,
    title: 'Call Recording & Compliance',
    description: 'Automatically record and store every call with searchable transcripts. Ensure regulatory compliance with built-in audit trails and disclosure tracking.',
    color: '#22D3EE'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First CRM',
    description: 'Your entire sales operation in your pocket. Log calls, update deals, and manage follow-ups directly from your smartphone—no desktop required.',
    color: '#C8FF2E'
  },
  {
    icon: MessageSquare,
    title: 'Multi-Channel Outreach',
    description: 'Blend calls, SMS, WhatsApp, and email into unified sequences. Meet prospects on their preferred channel while maintaining a single conversation thread.',
    color: '#22D3EE'
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="section relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#22D3EE]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="gradient-text"> Close More Deals</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            From SIM-based calling to automated workflows, Televalley provides a complete
            telecalling ecosystem that eliminates lead leakage and maximizes rep productivity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon className="w-6 h-6" style={{ color: service.color }} />
              </div>
              <h3 className="text-lg font-semibold text-[#E6EDF3] mb-2">{service.title}</h3>
              <p className="text-sm text-[#8B949E] leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="btn btn-secondary">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
