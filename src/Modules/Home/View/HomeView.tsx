// import { HomeProvider } from '../Provider/HomeProvider';
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
