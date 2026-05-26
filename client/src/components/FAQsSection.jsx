import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How is SIM-based calling different from VoIP?',
    answer: 'SIM-based calling uses your phone\'s native cellular network instead of routing calls over the internet (VoIP). This means zero dependency on internet bandwidth, no call drops due to WiFi instability, and crystal-clear call quality that matches regular phone calls. Unlike VoIP CRMs that require stable internet, Televalley works anywhere you have cellular coverage.'
  },
  {
    question: 'Will my team need any special hardware?',
    answer: 'Absolutely not. Televalley transforms the smartphones your team already carries into powerful sales hubs. There\'s no need for desk phones, VoIP adapters, or any additional hardware. Simply download the app, connect your SIM, and start calling.'
  },
  {
    question: 'How does automated follow-up work?',
    answer: 'When a call ends, Televalley detects the outcome (answered, no-answer, voicemail, busy) and automatically triggers the appropriate follow-up action. This could be scheduling a redial, sending an SMS, creating a callback reminder, or moving the lead to a nurture sequence. You define the rules once, and the system executes them flawlessly.'
  },
  {
    question: 'Can managers track team performance in real-time?',
    answer: 'Yes. Televalley provides live dashboards showing who is calling, how many calls each rep has made, call outcomes, conversion rates, and pipeline movement. Managers get instant visibility without waiting for end-of-day reports.'
  },
  {
    question: 'Does Televalley integrate with my existing CRM?',
    answer: 'Yes. Televalley integrates with HubSpot, Salesforce, Zoho CRM, and many others. We offer two-way sync for leads, contacts, deals, and activities. Custom integrations are also available via our API and webhook support.'
  },
  {
    question: 'Is my call data secure?',
    answer: 'Security is a top priority. All calls are encrypted end-to-end, and recordings are stored in SOC 2 compliant infrastructure. We offer role-based access controls, audit trails, and GDPR-compliant data handling. Call recordings can be configured to auto-delete after a retention period you define.'
  },
  {
    question: 'How long does implementation take?',
    answer: 'Most teams are up and running within 24 hours. The app download takes minutes, and our onboarding team helps configure your workflows, integrations, and team structure. For enterprise deployments, we offer white-glove setup with dedicated support.'
  },
  {
    question: 'What industries benefit most from Televalley?',
    answer: 'Televalley is built for any industry where phone calls drive revenue. Our top sectors include real estate (brokerages and agents), insurance (distribution agencies), education technology (enrollment teams), financial services (lending firms), and B2B inside sales teams.'
  }
];

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section relative bg-[#161B22]/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">FAQs</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Questions?
            <span className="gradient-text"> We've Got Answers.</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            Everything you need to know about Televalley before you start your free trial.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card p-0 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-[#E6EDF3] pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#8B949E] flex-shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-[#8B949E] leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
