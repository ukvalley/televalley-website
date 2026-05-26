import ContactSection from '../components/ContactSection';
import useScrollToTop from '../hooks/useScrollToTop';

export default function ContactPage() {
  useScrollToTop();
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  );
}
