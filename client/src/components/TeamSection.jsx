import { motion } from 'framer-motion';
import { Globe, MessageCircle } from 'lucide-react';

const team = [
  {
    name: 'Umesh Jain',
    role: 'Founder & CEO',
    bio: 'Visionary leader with deep expertise in telecalling operations and mobile technology. Umesh founded Televalley to eliminate the friction sales teams face every day.',
    image: '/team/umesh.jpg',
    links: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Product',
    bio: 'Former product lead at a leading CRM company. Priya drives the product roadmap, ensuring every feature solves real telecalling pain points.',
    image: '/team/priya.jpg',
    links: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Rahul Mehta',
    role: 'CTO',
    bio: 'Telecom engineer with 10+ years building carrier-grade communication systems. Rahul architected Televalley\'s SIM-based calling infrastructure.',
    image: '/team/rahul.jpg',
    links: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Anjali Desai',
    role: 'Head of Customer Success',
    bio: 'Passionate about helping sales teams succeed. Anjali ensures every Televalley customer achieves their conversion goals.',
    image: '/team/anjali.jpg',
    links: { linkedin: '#', twitter: '#' }
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="section relative bg-[#161B22]/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge mb-4">Our Team</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Built by People Who
            <span className="gradient-text"> Understand Sales</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            Our team combines telecom engineering expertise with deep sales operations knowledge.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card group text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C8FF2E]/20 to-[#22D3EE]/20 border-2 border-[#C8FF2E]/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#C8FF2E]">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#E6EDF3]">{member.name}</h3>
              <p className="text-sm text-[#C8FF2E] mb-3">{member.role}</p>
              <p className="text-sm text-[#8B949E] mb-4">{member.bio}</p>
              <div className="flex justify-center gap-3">
                <a href={member.links.linkedin} className="text-[#8B949E] hover:text-[#C8FF2E]">
                  <Globe className="w-4 h-4" />
                </a>
                <a href={member.links.twitter} className="text-[#8B949E] hover:text-[#C8FF2E]">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
