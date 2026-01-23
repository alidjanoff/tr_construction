import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useHome } from '../Provider/HomeContext';
import { getTranslation } from '../../../utils/translations';
import SectionTitle from '../../../components/UI/SectionTitle';
import './ServicesSection.scss';

// Import service images
import serviceInterior from '../../../assets/images/interyer.jpg';
import serviceExterior from '../../../assets/images/eksteryer.jpeg';
import serviceConstruction from '../../../assets/images/tikinti.jpg';
import serviceRenovation from '../../../assets/images/yenileme.jpg';

// Service images mapped by index (fallback when no images from API)
const fallbackServiceImages = [
  serviceInterior,
  serviceExterior,
  serviceConstruction,
  serviceRenovation,
];

const ServicesSection = () => {
  const { t } = useTranslation();
  const { homeData, currentLang } = useHome();

  const services = homeData?.services || [];

  return (
    <section className="services section" id="services">
      <div className="services__container container">
        <SectionTitle
          title={t('services.sectionTitle')}
          subtitle={t('services.sectionSubtitle')}
        />

        <motion.div
          className="services__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0, margin: '100px 0px' }}
        >
          {services.map((service, index) => {
            // Use API image if available, otherwise use fallback image
            const serviceImage = service.image || fallbackServiceImages[index % fallbackServiceImages.length];
            const serviceTitle = getTranslation(service.title, currentLang);
            const serviceInfo = getTranslation(service.info, currentLang);

            return (
              <motion.div
                key={service.id || index}
                className="services__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="services__card-image">
                  <img src={serviceImage} alt={serviceTitle} />
                </div>
                <div className="services__card-content">
                  <h3 className="services__card-title">{serviceTitle}</h3>
                  <p className="services__card-description">{serviceInfo}</p>
                </div>
                <div className="services__card-line" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
