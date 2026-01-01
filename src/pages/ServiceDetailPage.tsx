import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageHero from '../components/UI/PageHero';
import { useHome } from '../Modules/Home/Provider/HomeProvider';

const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { homeData } = useHome();

  // Assuming services are in homeData or translated
  // Since services might be static in translation, we will try to get them from translation
  // Mapping ID to translation key if needed. 
  // homeData?.services is an array (likely). Let's check structure or assume map.
  
  const service = homeData?.services?.find((s) => s.id === id) || 
                  homeData?.services?.find(s => s.icon === id); // fallback

  const title = service ? t(service.titleKey) : t(`services.items.${id}.title`);
  const description = service ? t(service.descriptionKey) : t(`services.items.${id}.description`);

  return (
    <div className="service-detail-page">
      <PageHero title={title || t('services.sectionTitle')} />
      
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#666' }}>
          ← {t('common.back')}
        </Link>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="content"
           style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title}</h2>
          <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: '1.625', marginBottom: '1.5rem' }}>
            {description}
          </p>
          
          <p style={{ color: '#4b5563' }}>
             {/* Placeholder extra content since we don't have separate rich text for each service yet */}
             {t('intro.tagline')} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
               {/* Placeholders for images or features */}
               <div style={{ height: '12rem', backgroundColor: '#e5e7eb', borderRadius: '0.25rem' }}></div>
               <div style={{ height: '12rem', backgroundColor: '#e5e7eb', borderRadius: '0.25rem' }}></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
