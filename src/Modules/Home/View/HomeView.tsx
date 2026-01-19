import { useHome } from '../Provider/HomeContext';
import Loader from '../../../components/UI/Loader';
import HeroSection from '../Components/HeroSection';
import AboutSection from '../Components/AboutSection';
import ServicesSection from '../Components/ServicesSection';
import StatsSection from '../Components/StatsSection';
import ProjectsSection from '../Components/ProjectsSection';
import WorkflowSection from '../Components/WorkflowSection';
import PartnersSection from '../Components/PartnersSection';
import TestimonialsSection from '../Components/TestimonialsSection';
import ContactSection from '../Components/ContactSection';

const HomeView = () => {
  const { isLoading } = useHome();

  if (isLoading) {
    return <Loader fullPage size="lg" />;
  }

  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <WorkflowSection />
      <PartnersSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
};

export default HomeView;
