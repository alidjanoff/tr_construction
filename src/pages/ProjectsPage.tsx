import { useHome } from '../Modules/Home/Provider/HomeProvider';
import Loader from '../components/UI/Loader';
import ProjectsSection from '../Modules/Home/Components/ProjectsSection';
import TestimonialsSection from '../Modules/Home/Components/TestimonialsSection';
import ContactSection from '../Modules/Home/Components/ContactSection';

const ProjectsPage = () => {
  const { isLoading } = useHome();

  if (isLoading) {
    return <Loader fullPage size="lg" />;
  }

  return (
    <main style={{ paddingTop: '100px' }}>
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
};

export default ProjectsPage;
