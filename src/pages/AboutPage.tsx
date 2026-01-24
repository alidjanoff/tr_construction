import { useHome } from '../Modules/Home/Provider/HomeContext';
import Loader from '../components/UI/Loader';
import AboutSection from '../Modules/Home/Components/AboutSection';
import StatsSection from '../Modules/Home/Components/StatsSection';
import PartnersSection from '../Modules/Home/Components/PartnersSection';
import ContactSection from '../Modules/Home/Components/ContactSection';

const AboutPage = () => {
  const { isLoading } = useHome();

  if (isLoading) {
    return <Loader fullPage size="lg" />;
  }

  return (
    <main style={{ paddingTop: '100px' }}>
      <AboutSection />
      <StatsSection />
      <PartnersSection backgroundColor="#f5f5f5" />
      <ContactSection backgroundColor='#fff' />
    </main>
  );
};

export default AboutPage;
