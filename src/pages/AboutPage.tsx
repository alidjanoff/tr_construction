import AboutSection from '../Modules/Home/Components/AboutSection';
import StatsSection from '../Modules/Home/Components/StatsSection';
import PartnersSection from '../Modules/Home/Components/PartnersSection';

const AboutPage = () => {
  return (
    <main style={{ paddingTop: '100px' }}>
      <AboutSection />
      <StatsSection />
      <PartnersSection />
    </main>
  );
};

export default AboutPage;
