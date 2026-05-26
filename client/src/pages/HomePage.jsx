import useScrollToTop from '../hooks/useScrollToTop';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import FeaturesSection from '../components/FeaturesSection';
import CaseStudiesSection from '../components/CaseStudiesSection';
import TeamSection from '../components/TeamSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQsSection from '../components/FAQsSection';
import CTABlocks from '../components/CTABlocks';
import IndustriesSection from '../components/IndustriesSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  useScrollToTop();
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <CaseStudiesSection />
      <IndustriesSection />
      <TestimonialsSection />
      <TeamSection />
      <FAQsSection />
      <CTABlocks />
      <ContactSection />
    </>
  );
}
