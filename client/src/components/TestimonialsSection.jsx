import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Director Diana',
    role: 'Director of Sales Operations',
    company: 'Metro Realty Group',
    industry: 'Real Estate',
    quote: 'Before Televalley, our agents were spending more time on admin than selling. Now, with automated follow-ups and SIM-based calling, our team is actually closing deals instead of fighting software. Lead leakage is down to under 3%.',
    rating: 5
  },
  {
    name: 'Broker Brad',
    role: 'Broker / Owner',
    company: 'Premier Properties',
    industry: 'Real Estate',
    quote: 'I have complete visibility into my agents\' daily calling activity for the first time ever. Televalley paid for itself in the first month just from the deals we stopped losing to missed follow-ups.',
    rating: 5
  },
  {
    name: 'Agency-Owner Arjun',
    role: 'Founder & CEO',
    company: 'SecureLife Insurance',
    industry: 'Insurance',
    quote: 'Our policy conversion jumped from 8% to 14% in 90 days. The automated nurture sequences mean no lead goes cold, and the SIM calling quality is miles ahead of our old VoIP setup.',
    rating: 5
  },
  {
    name: 'Sales-Driven Sunita',
    role: 'Head of Sales',
    company: 'FinServe Lending',
    industry: 'Financial Services',
    quote: 'The real-time dashboards changed how I manage my team. I can see who is performing, who needs coaching, and where leads are getting stuck—all from my phone.',
    rating: 5
  },
  {
    name: 'Admissions Anna',
    role: 'Director of Admissions',
    company: 'EduPro Institute',
    industry: 'EdTech',
    quote: 'During peak admission season, Televalley handled 4x our normal lead volume without breaking a sweat. Smart prioritization meant our best prospects got called first. Enrollment is up 35%.',
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#C8FF2E]/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Loved by Sales Teams
            <span className="gradient-text"> Everywhere</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            Don't take our word for it. Here's what sales directors and team leads say about Televalley.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="card relative"
              >
                <Quote className="w-10 h-10 text-[#C8FF2E]/20 absolute top-6 right-6" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C8FF2E] text-[#C8FF2E]" />
                  ))}
                </div>

                <blockquote className="text-lg md:text-xl text-[#E6EDF3] leading-relaxed mb-8">
                  "{testimonials[current].quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8FF2E]/20 to-[#22D3EE]/20 flex items-center justify-center">
                    <span className="font-bold text-[#C8FF2E]">
                      {testimonials[current].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#E6EDF3]">{testimonials[current].name}</p>
                    <p className="text-sm text-[#8B949E]">
                      {testimonials[current].role} · {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6">
              <button onClick={prev} className="p-2 rounded-lg bg-[#161B22] border border-white/5 text-[#8B949E] hover:text-[#C8FF2E] transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? 'w-8 bg-[#C8FF2E]' : 'bg-[#8B949E]/30'
                    }`}
                  />
                ))}
              </div>

              <button onClick={next} className="p-2 rounded-lg bg-[#161B22] border border-white/5 text-[#8B949E] hover:text-[#C8FF2E] transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
