import { useHome } from '../Modules/Home/Provider/HomeContext';
import Loader from '../components/UI/Loader';
import ServicesSection from '../Modules/Home/Components/ServicesSection';
import WorkflowSection from '../Modules/Home/Components/WorkflowSection';
import ContactSection from '../Modules/Home/Components/ContactSection';

const ServicesPage = () => {
  const { isLoading } = useHome();

  if (isLoading) {
    return <Loader fullPage size="lg" />;
  }

  return (
    <main style={{ paddingTop: '100px', background: '#F5F5F5' }}>
      <ServicesSection />
      <WorkflowSection backgroundColor='#fff' />
      <ContactSection backgroundColor='#f5f5f5' />
    </main>
  );
};

export default ServicesPage;
