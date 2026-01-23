import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageHero from '../components/UI/PageHero';
import { servicesAPI } from '../services/api';
import { getTranslation } from '../utils/translations';
import type { Service } from '../types';
import Loader from '../components/UI/Loader';

const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'az';

  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const data = await servicesAPI.getOne(id);
      setService(data);
      setIsLoading(false);
    };

    fetchService();
  }, [id]);

  // Show loader while data is loading
  if (isLoading) {
    return <Loader fullPage size="lg" />;
  }

  // Get translated values - use API data if available, fallback to i18n
  const title = service
    ? getTranslation(service.title, currentLang)
    : t(`services.items.${id}.title`);
  const description = service
    ? getTranslation(service.info, currentLang)
    : t(`services.items.${id}.description`);

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
          {service?.image && (
            <div style={{ marginBottom: '2rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <img
                src={service.image}
                alt={title}
                style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }}
              />
            </div>
          )}
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title}</h2>
          <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: '1.625', marginBottom: '1.5rem' }}>
            {description}
          </p>

          <p style={{ color: '#4b5563' }}>
            {t('intro.tagline')} - {description}
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
